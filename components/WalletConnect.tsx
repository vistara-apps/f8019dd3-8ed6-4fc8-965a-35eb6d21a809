'use client'

import { useWallet } from '@/lib/hooks/useWallet'
import { Button } from './ui/Button'
import { Wallet, LogOut } from 'lucide-react'

export function WalletConnect() {
  const { address, isConnected, isConnecting, balance, connectWallet, disconnectWallet } = useWallet()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm">
          <div className="font-medium">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
          {balance && (
            <div className="text-muted-foreground">
              {balance} tokens
            </div>
          )}
        </div>
        <Button
          onClick={disconnectWallet}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="flex items-center gap-2"
    >
      <Wallet className="w-4 h-4" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  )
}

