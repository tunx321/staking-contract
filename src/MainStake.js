import { useState } from "react";
import stakingABI from "./Staking.json"
import { Box, Button, Flex, Input, Text} from '@chakra-ui/react';
const ethers = require("ethers");

const contractAddress = "0x7096f47674Ee5a5ce081e93C1BFB07C3ACaDb351";

const MainMint = ({accounts, setAccounts}) =>{
    const isConnected = Boolean(accounts[0])
    const [uri, setUri] = useState('')


    async function handleMint(){

    
        if (window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(
                contractAddress,
                stakingABI.abi,
                signer,
            )

            try {
                const uriString = { uri }
                const address = accounts[0]
                setUri('')
                console.log("AAA: ", uriString.uri, address)
                const options = {value: "5000000000000000"}
                const response = await contract.safeMint(address, uriString.uri, options)
                console.log("response: ", response)
                
            } catch (error) {
                console.log("erorr: ", error)
            }
        }
    }
    return (

        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
            <div>
                <Text fontSize="48px" textShadow="0 5px #000000">Staking contract</Text>
                <Text
                fontSize="30px"
                letterSpacing="-5.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000000"
                
                >It's 2023. Stake costs 0.005 ETH. Tungatov Almat, Alizhan Umbetov, Aiym Amangeldiyeva</Text>
            </div>
            {isConnected ? (
                <Flex className="create" align="center" justify="cetner">
                    
                    <form>
                        <Input
                        fontFamily="inherit"
                        width="500px"
                        height="40px"
                        textAlign="center"
                        type="text" 
                        required 
                        value={uri} 
                        onChange={(e)=> setUri(e.target.value)}/>
                        <Button 
                     backgroundColor="#D6517D" 
                     borderRadius="5px"
                     boxShadow="0px 2px 2px 1px #0F0F0F"
                     color="white"
                     cursor="pointer"
                     fontFamily="inherit"
                     padding="15px"
                     marginTop="10px"
                     onClick={handleMint}>Stake</Button>
                    </form> 
                    
                    
                
                </Flex>
                
            ):(
                <p>You must be connected to Stake.</p>
            )}
            
            </Box>
        </Flex>
    )

}

export default MainMint;