'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Wallet,
} from 'lucide-react';
import { getTradingAccounts } from '@/app/api/balance/getTradingAccounts';
import { getWallets } from '@/app/api/balance/getWallets';
import { getPortfolio } from '@/app/api/balance/getPortfolio';
import { getTickets } from '@/app/api/balance/getTickets';
import type {
  TradingAccountDto,
  WalletDto,
  PortfolioDto,
  TicketDto,
} from '@/app/api/types/trading';
import { useTranslations } from 'next-intl';

interface FinanceData {
  tradingAccounts: TradingAccountDto[];
  allWallets: WalletDto[];
  portfolios: PortfolioDto[];
  recentTickets: TicketDto[];
  totalAssets: number;
  totalCashBalance: number;
  totalInvestments: number;
  totalSavings: number;
  walletsByAccount: { [accountId: string]: WalletDto[] };
}

export default function FinancePage() {
  const [financeData, setFinanceData] = useState<FinanceData>({
    tradingAccounts: [],
    allWallets: [],
    portfolios: [],
    recentTickets: [],
    totalAssets: 0,
    totalCashBalance: 0,
    totalInvestments: 0,
    totalSavings: 0,
    walletsByAccount: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const t = useTranslations();

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    try {
      setLoading(true);
      setError('');

      const accountsResponse = await getTradingAccounts();
      if (!accountsResponse.success) {
        setError(accountsResponse.message || 'Failed to load trading accounts');
        return;
      }

      const accounts = accountsResponse.data || [];
      if (accounts.length === 0) {
        setFinanceData(prev => ({ ...prev, tradingAccounts: [] }));
        setLoading(false);
        return;
      }

      const accountPromises = accounts.map(async account => {
        const [walletsResponse, portfolioResponse, ticketsResponse] =
          await Promise.all([
            getWallets(account.id),
            getPortfolio(account.id),
            getTickets({ tradingAccountId: account.id, pageSize: 5 }),
          ]);

        return {
          account,
          wallets: walletsResponse.success ? walletsResponse.data || [] : [],
          portfolio: portfolioResponse.success ? portfolioResponse.data : null,
          tickets: ticketsResponse.success ? ticketsResponse.data || [] : [],
        };
      });

      const accountsData = await Promise.all(accountPromises);

      const allWallets: WalletDto[] = [];
      const portfolios: PortfolioDto[] = [];
      const recentTickets: TicketDto[] = [];
      const walletsByAccount: { [accountId: string]: WalletDto[] } = {};

      accountsData.forEach(({ account, wallets, portfolio, tickets }) => {
        walletsByAccount[account.id] = wallets;

        allWallets.push(...wallets);
        if (portfolio) portfolios.push(portfolio);
        recentTickets.push(...tickets);
      });

      const totalCashBalance = allWallets.reduce(
        (sum, wallet) => sum + wallet.usdEquivalent,
        0
      );

      const totalInvestments = portfolios.reduce(
        (sum, portfolio) => sum + portfolio.totalUsdValue,
        0
      );

      const totalSavings = allWallets
        .filter(
          wallet => wallet.currency === 'USDT' || wallet.currency === 'USD'
        )
        .reduce((sum, wallet) => sum + wallet.usdEquivalent, 0);

      const totalAssets = totalCashBalance + totalInvestments;

      recentTickets.sort((a, b) => b.id.localeCompare(a.id));

      setFinanceData({
        tradingAccounts: accounts,
        allWallets,
        portfolios,
        recentTickets: recentTickets.slice(0, 10),
        totalAssets,
        totalCashBalance,
        totalInvestments,
        totalSavings,
        walletsByAccount,
      });
    } catch (err) {
      console.error('Finance data fetch error:', err);
      setError('Failed to load finance data');
    } finally {
      setLoading(false);
    }
  };

  const getAccountStatusBadge = (account: TradingAccountDto) => {
    const status = account.status.toLowerCase();
    if (status === 'active') {
      return <Badge className='bg-green-100 text-green-800'>Active</Badge>;
    }
    if (status === 'suspended') {
      return <Badge className='bg-red-100 text-red-800'>Suspended</Badge>;
    }
    return <Badge variant='secondary'>{account.status}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getTicketStatusColor = (status: number) => {
    switch (status) {
      case 2: // Completed
        return 'text-green-600';
      case 0: // Pending
        return 'text-yellow-600';
      case 1: // Processing
        return 'text-blue-600';
      default:
        return 'text-red-600';
    }
  };

  const getTicketStatusText = (status: number) => {
    const statusMap: { [key: number]: string } = {
      0: 'Pending',
      1: 'Processing',
      2: 'Completed',
      3: 'Cancelled',
      4: 'Failed',
      5: 'Rejected',
    };
    return statusMap[status] || 'Unknown';
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center h-64'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
            <p className='mt-2 text-muted-foreground'>
              {t('finance.loading')}{' '}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='text-center'>
            <AlertCircle className='h-12 w-12 text-red-500 mx-auto mb-4' />
            <h2 className='text-xl font-semibold mb-2'>
              Error Loading Finance Data
            </h2>
            <p className='text-muted-foreground mb-4'>{error}</p>
            <Button onClick={fetchFinanceData}>Retry</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            {t('finance.title')}
          </h1>
          <p className='text-muted-foreground'>{t('finance.subtitle')}</p>
        </div>

        {/* Financial Overview */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('finance.cashBalance')}
              </CardTitle>
              <CreditCard
                className='h-4 w-4 text-muted-foreground'
                color='gold'
              />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {formatCurrency(financeData.totalCashBalance)}
              </div>
              <p className='text-xs text-muted-foreground'>
                {financeData.allWallets.length}
                {financeData.allWallets.length !== 1
                  ? t('finance.wallets')
                  : t('finance.wallet')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'> {t('finance.investments')}</CardTitle>
              <TrendingUp
                className='h-4 w-4 text-muted-foreground'
                color='#0078ff'
              />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {formatCurrency(financeData.totalInvestments)}
              </div>
              <p className='text-xs text-muted-foreground'>
                {financeData.portfolios.reduce(
                  (sum, p) => sum + p.holdings.length,
                  0
                )}{' '}
                {t('finance.holdings')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Account Details */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>{t('finance.tradingAccounts')}</CardTitle>
              <CardDescription>
                {t('finance.tradingAccountsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {financeData.tradingAccounts.length === 0 ? (
                  <p className='text-sm text-muted-foreground'>
                    {t('finance.noTradingAccountsFound')}{' '}
                  </p>
                ) : (
                  financeData.tradingAccounts.map(account => {
                    const accountWallets =
                      financeData.walletsByAccount[account.id] || [];
                    const accountBalance = accountWallets.reduce(
                      (sum, wallet) => sum + wallet.usdEquivalent,
                      0
                    );

                    return (
                      <div
                        key={account.id}
                        className='flex items-center justify-between p-4 border rounded-lg'
                      >
                        <div className='flex items-center space-x-4'>
                          <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
                            <Wallet className='h-5 w-5 text-blue-600' />
                          </div>
                          <div>
                            <p className='font-medium'>{account.displayName}</p>
                            <p className='text-sm text-muted-foreground'>
                              {t('finance.account')}: {account.accountNumber}{' '}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {accountWallets.length} wallet
                              {accountWallets.length !== 1
                                ? t('finance.wallets')
                                : t('finance.wallet')}
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='font-medium'>
                            {formatCurrency(accountBalance)}
                          </p>
                          {getAccountStatusBadge(account)}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          <Card className='col-span-3'>
            <CardHeader>
              <CardTitle>{t('finance.recentTransactions')}</CardTitle>
              <CardDescription>
                {t('finance.recentTransactionsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              {financeData.recentTickets.length === 0 ? (
                <p className='text-sm text-muted-foreground'>
                  {t('finance.noRecentTransactions')}
                </p>
              ) : (
                financeData.recentTickets.slice(0, 5).map(ticket => (
                  <div key={ticket.id} className='rounded-lg border p-3'>
                    <div className='flex justify-between items-center'>
                      <div>
                        <p className='font-medium text-sm'>
                          {ticket.ticketType === 0
                            ? t('finance.deposit')
                            : t('finance.withdrawal')}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {formatCurrency(ticket.amount)}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p
                          className={`text-xs font-medium ${getTicketStatusColor(
                            ticket.ticketStatus
                          )}`}
                        >
                          {getTicketStatusText(ticket.ticketStatus)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Wallet Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>{t('finance.walletBreakdown')}</CardTitle>
            <CardDescription>
              {t('finance.walletBreakdownDescription')}{' '}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {financeData.allWallets.length === 0 ? (
              <div className='flex items-center justify-center h-32 text-muted-foreground'>
                <p>{t('finance.noWalletsFound')}</p>
              </div>
            ) : (
              <div className='space-y-6'>
                {financeData.tradingAccounts.map(account => {
                  const accountWallets =
                    financeData.walletsByAccount[account.id] || [];

                  if (accountWallets.length === 0) return null;

                  return (
                    <div key={account.id} className='space-y-3'>
                      <div className='flex items-center gap-2'>
                        <h4 className='font-medium text-sm'>
                          {account.displayName}
                        </h4>
                        <Badge variant='outline' className='text-xs'>
                          {account.accountNumber}
                        </Badge>
                      </div>
                      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {accountWallets.map(wallet => (
                          <Card key={wallet.id} className='p-4'>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center space-x-2'>
                                <div className='h-8 w-8 rounded-full bg-green-100 flex items-center justify-center'>
                                  <DollarSign className='h-4 w-4 text-green-600' />
                                </div>
                                <div>
                                  <p className='font-medium'>
                                    {wallet.currency}
                                  </p>
                                  <p className='text-xs text-muted-foreground'>
                                    {t('finance.available')} :{' '}
                                    {wallet.availableBalance.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className='text-right'>
                                <p className='font-medium'>
                                  {formatCurrency(wallet.usdEquivalent)}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                  {wallet.totalBalance.toLocaleString()}{' '}
                                  {wallet.currency}
                                </p>
                              </div>
                            </div>
                            {wallet.lockedBalance > 0 && (
                              <div className='mt-2 text-xs text-muted-foreground'>
                                Locked: {wallet.lockedBalance.toLocaleString()}{' '}
                                {wallet.currency}
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
