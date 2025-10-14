import { WalletProvider } from '.'
import { BINANCE } from '../..'

export default class BinanceProvider extends WalletProvider {
  observer?: MutationObserver

  public get library(): unknown | undefined {
    console.log('BINANCE', (window as any).binancew3w)
    return (window as any).binancew3w
  }

  initialize(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.observer = new window.MutationObserver(() => {
        if (this.library || this.isMobile()) {
          this.$store.setKey('hasProvider', {
            ...this.$store.get().hasProvider,
            [BINANCE]: true,
          })
          this.observer?.disconnect()
        }
      })
      this.observer.observe(document, { childList: true, subtree: true })
    }
  }

  connect(): Promise<boolean | void> {
    throw new Error('Method not implemented.')
  }

  dispose(): void {
    throw new Error('Method not implemented.')
  }

  disconnect(): void {
    throw new Error('Method not implemented.')
  }

  sendBTC(): Promise<string> {
    throw new Error('Method not implemented.')
  }

  signMessage(): Promise<string> {
    throw new Error('Method not implemented.')
  }

  signPsbt(): Promise<
    | {
        signedPsbtHex: string | undefined
        signedPsbtBase64: string | undefined
        txId?: string
      }
    | undefined
  > {
    throw new Error('Method not implemented.')
  }
}
