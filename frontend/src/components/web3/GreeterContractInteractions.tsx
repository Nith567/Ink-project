
//incremet by  how much
// type UpdateGreetingValues = { incrementBy: number };

// export const IncrementerContractInteractions: React.FC = () => {
//   const { api, activeAccount, activeSigner } = useInkathon();
//   const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Greeter);
//   const [incrementerValue, setIncrementerValue] = useState<number>(1);
//   const [fetchIsLoading, setFetchIsLoading] = useState<boolean>(false);
//   const [updateIsLoading, setUpdateIsLoading] = useState<boolean>(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { register, handleSubmit,reset } = useForm<UpdateGreetingValues>(); // Use the useForm hook correctly

//   // const fetchIncrementerValue = async () => {
//   //   if (!contract || !api) return;

//   //   setFetchIsLoading(true);
//   //   try {
//   //     const result = await contractQuery(api, '', contract, 'get');
//   //     const { output, isError, decodedOutput } = decodeOutput(result, contract, 'get');
//   //     if (isError) throw new Error(decodedOutput);
//   //     setIncrementerValue(output.toNumber);
//   //     console.log("so ouput is bhai "+output)
//   //   } catch (e) {
//   //     console.error(e);
//   //     toast.error('Errvalue. Try agai  ' + e);
//   //     setIncrementerValue(1);
//   //   } finally {
//   //     setFetchIsLoading(false);
//   //   }
//   // }
//   const fetchIncrementerValue = async () => {
//     if (!contract || !api) return;
  
//     setFetchIsLoading(true);
//     try {
//       console.log('Fetching from contract:', contract);
//       const result = await contractQuery(api, '', contract, 'get');
//       console.log('Query result:', result);
//       const { output, isError, decodedOutput } = decodeOutput(result, contract, 'get');
//       console.log('Decoded output:', output, isError, decodedOutput);
//       // if (isError) throw new Error(decodedOutput);
//       setIncrementerValue(Number(output.toString()));

//       console.log('Incrementer value:', output);
//     } catch (e) {
//       console.error(e);
//       toast.error('Error while fetching Incrementer value. Try again…');
//       setIncrementerValue(1);
//     } finally {
//       setFetchIsLoading(false);
//     }
//   }
  
//   // const updateIncrementerValue = async ({incrementBy}: UpdateGreetingValues) => { // Use data instead of { incrementBy }
//   //   if (!activeAccount || !contract || !activeSigner || !api) {
//   //     toast.error('Wallet not connected. Try again…');
//   //     return;
//   //   }

//   //   // Send transaction
//   //   setUpdateIsLoading(true);
//   //   try {
//   //     await contractTxWithToast(api, activeAccount.address, contract, 'inc', {}, [incrementBy]);

//   //     reset();
//   //   } catch (e) {
//   //     console.error(e);
//   //     toast.error('Error while updating Incrementer value. Try again…');
//   //   } finally {
//   //     setUpdateIsLoading(false);
//   //     fetchIncrementerValue()
//   //   }
//   // }
//   const updateIncrementerValue = async ({ incrementBy }: UpdateGreetingValues) => {
//     if (!activeAccount || !contract || !activeSigner || !api) {
//       toast.error('Wallet not connected. Try again…');
//       return;
//     }
  
//     // Log the incrementBy value and contract address for debugging
//     console.log('Increment By:', incrementBy);
//     console.log('Contract Address:', contract.address);
  
//     // Send transaction
//     setUpdateIsLoading(true);
//     try {
//       await contractTxWithToast(api, activeAccount.address, contract, 'inc', {}, [incrementBy]);
//       reset();
//     } catch (e) {
//       console.error(e);
//       toast.error('Error while updating Incrementer value. Try again…');
//     } finally {
//       setUpdateIsLoading(false);
//       fetchIncrementerValue();
//     }
//   }
  

//   return (
//     <div>
//       <h2>Incrementer Smart Contract</h2>

//       <Card>
//         <FormControl>
//           <FormLabel>Incrementer Value</FormLabel>
//           <Input
//             placeholder={fetchIsLoading || !contract ? 'Loading…' : `${incrementerValue}`}
//             disabled={true}
//           />
//         </FormControl>
//       </Card>

//       <Card>
//         <form onSubmit={handleSubmit(updateIncrementerValue)}>
//           <Stack direction="row" spacing={2} align="end">
//             <FormControl>
//               <FormLabel>Increment By</FormLabel>
          
// {/* <Input disabled={updateIsLoading} {...register('incrementBy')} />
//  */}
//  <Input
//                 type="number"
//                 disabled={updateIsLoading}
//                 {...register('incrementBy', { required: true, min: 1 })}
//               />
//             </FormControl>
//             <Button
//               type="submit"
//               colorScheme="blue"
//               isLoading={updateIsLoading}
//               disabled={updateIsLoading}
//             >
//               Increment
//             </Button>
//           </Stack>
//         </form>
//       </Card>

//       <p>Contract Address: {contract ? contractAddress : 'Loading…'}</p>
//     </div>
//   );
// };


import { ContractIds } from '@/deployments/deployments'
import { contractTxWithToast } from '@/utils/contractTxWithToast'
import { Button, Card, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import 'twin.macro'

type UpdateGreetingValues = { newMessage: string }

export const GreeterContractInteractions: FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Greeter)
  const [greeterMessage, setGreeterMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [updateIsLoading, setUpdateIsLoading] = useState<boolean>()
  const { register, reset, handleSubmit } = useForm<UpdateGreetingValues>()

  // Fetch Greeting
  const fetchGreeting = async () => {
    if (!contract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'greet')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'greet')
      if (isError) throw new Error(decodedOutput)
      setGreeterMessage(output)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching greeting. Try again…')
      setGreeterMessage(undefined)
    } finally {
      setFetchIsLoading(false)
    }
  }
  useEffect(() => {
    fetchGreeting()
  }, [contract])

  // Update Greeting
  const updateGreeting = async ({ newMessage }: UpdateGreetingValues) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    // Send transaction
    setUpdateIsLoading(true)
    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'setMessage', {}, [
        newMessage,
      ])
      reset()
    } catch (e) {
      console.error(e)
    } finally {
      setUpdateIsLoading(false)
      fetchGreeting()
    }
  }

  if (!api) return null

  return (
    <>
      <div tw="flex grow flex-col space-y-4 max-w-[20rem]">
        <h2 tw="text-center font-mono text-gray-400">Greeter Smart Contract</h2>

        {/* Fetched Greeting */}
        <Card variant="outline" p={4} bgColor="whiteAlpha.100">
          <FormControl>
            <FormLabel>Fetched Greeting</FormLabel>
            <Input
              placeholder={fetchIsLoading || !contract ? 'Loading…' : greeterMessage}
              disabled={true}
            />
          </FormControl>
        </Card>

        {/* Update Greeting */}
        <Card variant="outline" p={4} bgColor="whiteAlpha.100">
          <form onSubmit={handleSubmit(updateGreeting)}>
            <Stack direction="row" spacing={2} align="end">
              <FormControl>
                <FormLabel>Update Greeting</FormLabel>
                <Input disabled={updateIsLoading} {...register('newMessage')} />
              </FormControl>
              <Button
                type="submit"
                mt={4}
                colorScheme="purple"
                isLoading={updateIsLoading}
                disabled={updateIsLoading}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Card>

        {/* Contract Address */}
        <p tw="text-center font-mono text-xs text-gray-600">
          {contract ? contractAddress : 'Loading…'}
        </p>
      </div>
    </>
  )
}