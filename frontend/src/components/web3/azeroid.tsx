import { SupportedChainId } from '@azns/resolver-core';
import { useResolveAddressToDomain, useResolveDomainToAddress } from '@azns/resolver-react';
import { useState } from 'react';
import 'twin.macro';


export default function Home() {
  const [chainId, setChainId] = useState(SupportedChainId.AlephZeroTestnet);
  const [customRouterAddress, setCustomRouterAddress] = useState<string>();
  const [lookupDomain, setLookupDomain] = useState<string>('nith-minter.tzero');
  const [lookupAddress, setLookupAddress] = useState<string>('5EFJEY4DG2FnzcuCZpnRjjzT4x7heeEXuoYy1yAoUmshEhAP');

  // Resolve Domain → Address
  const domainResolver = useResolveDomainToAddress(lookupDomain, {
    debug: true,
    chainId,
    ...(customRouterAddress && {
      customContractAddresses: { azns_router: customRouterAddress },
    }),
  });

  // Resolve Address → Primary Domain
  const addressResolver = useResolveAddressToDomain(lookupAddress, {
    debug: true,
    chainId,
    ...(customRouterAddress && {
      customContractAddresses: { azns_router: customRouterAddress },
    }),
  });

  return (
    <main tw="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-[#191816] p-10 text-white">
      <h1 tw="text-center text-xl font-semibold">
      </h1>

      <div tw="flex w-full max-w-xl flex-col gap-8 rounded-lg border border-white/10 bg-white/5 p-8">
        {/* Chain Selector */}
        <div tw="flex flex-col gap-4">
          <div>Select Chain:</div>
          <select
            tw="h-10 rounded-lg text-black"
            value={chainId}
            onChange={(e) => setChainId(e.target.value as SupportedChainId)}
          >
            <option value={SupportedChainId.AlephZeroTestnet}>Aleph Zero Testnet</option>
            <option value={SupportedChainId.AlephZero}>Aleph Zero</option>
            <option value={SupportedChainId.Development}>Local Development</option>
          </select>
        </div>

        {/* Custom Router Address */}
        <div tw="flex w-full flex-col gap-4">
          <div>Custom Router Address:</div>
          <input
            tw="h-10 w-full rounded-lg border-0 px-4 text-black"
            onChange={(e) => setCustomRouterAddress(e.target.value)}
          />
        </div>
      </div>

      {/* Resolve Domain → Address (on change) */}
      <div tw="flex w-full max-w-lg flex-col gap-5 text-center">
        <h2 tw="font-semibold">Resolve Domain → Address</h2>
        <input
          value={lookupDomain}
          tw="h-10 w-full rounded-lg border-0 px-4 text-black"
          onChange={(e) => setLookupDomain(e.target.value)}
        />
        {domainResolver.isLoading ? (
          <div tw="text-gray-500">Loading...</div>
        ) : domainResolver.hasError ? (
          <div tw="text-red-500">{domainResolver.error?.message}</div>
        ) : domainResolver.address ? (
          <div tw="text-[#E6FD3A]">{domainResolver.address}</div>
        ) : (
          <div tw="text-gray-500">No address found</div>
        )}
      </div>

      {/* Resolve Address → Primary Domain (on change) */}
      <div tw="flex w-full max-w-lg flex-col gap-5 text-center">
        <h2 tw="font-semibold">Resolve Address → Primary Domain</h2>
        <input
          value={lookupAddress}
          tw="h-10 w-full rounded-lg border-0 px-4 text-black"
          onChange={(e) => setLookupAddress(e.target.value)}
        />
        {addressResolver.isLoading ? (
          <div tw="text-gray-500">Loading...</div>
        ) : addressResolver.hasError ? (
          <div tw="text-red-500">{addressResolver.error?.message}</div>
        ) : addressResolver.primaryDomain ? (
          <div tw="text-[#E6FD3A]">{addressResolver.primaryDomain}</div>
        ) : (
          <div tw="text-gray-500">No domain found</div>
        )}
      </div>
    </main>
  );
}
