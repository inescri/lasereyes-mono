import { WalletProvider } from '.'
import { BINANCE, ProviderType } from '../..'

export default class BinanceProvider extends WalletProvider {
  observer?: MutationObserver

  public get library(): any | undefined {
    return (window as any).unisat
   // return (window as any).binancew3w?.ethereum
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



    async connect(_: ProviderType): Promise<void> {
      if (!this.library) throw new Error("Unisat isn't installed")
      const unisatAccounts = await this.library.requestAccounts()
      if (!unisatAccounts) throw new Error('No accounts found')
  
      const unisatPubKey = await this.library.getPublicKey()
      if (!unisatPubKey) throw new Error('No public key found')
      this.$store.setKey('accounts', unisatAccounts)
      this.$store.setKey('address', unisatAccounts[0])
      this.$store.setKey('paymentAddress', unisatAccounts[0])
      this.$store.setKey('publicKey', unisatPubKey)
      this.$store.setKey('paymentPublicKey', unisatPubKey)
    }


  dispose() {
    this.observer?.disconnect()
  }
  

  disconnect(): void {
   console.log('DISCONNECT BINANCE')
  }

  async requestAccounts(): Promise<string[]> {
    return await this.library.requestAccounts()
  }

  async sendBTC(): Promise<string> {
    return "NOT IMPLEMENTED"
  }

  async signMessage(): Promise<string> {
    return "NOT IMPLEMENTED"
  }

  async signPsbt(): Promise<
    | {
        signedPsbtHex: string | undefined
        signedPsbtBase64: string | undefined
        txId?: string
      }
    | undefined
  > {
    return undefined;
  }
}
