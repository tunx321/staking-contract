import { useState } from "react";
import stakingABI from "./Staking.json"
import { Box, Button, Flex, Input, Image} from '@chakra-ui/react';
import Restart from "./assets/restart.png"
const { ethers } = require("ethers");

const contractAddress = "0x7096f47674Ee5a5ce081e93C1BFB07C3ACaDb351";

const MainStake = ({accounts, setAccounts}) =>{
    const isConnected = Boolean(accounts[0])
    const [amount, setAmount] = useState('')
    const [balance, setBalance] = useState('')
    const [time, setTime] = useState('')

    async function handleStake(){

    
        if (window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(
                contractAddress,
                stakingABI.abi,
                signer,
            )

            try {
                let _amount ={ amount }
                console.log(_amount.amount)
                setAmount('')
                const options = {value: ethers.parseUnits(String(_amount.amount), "ether")}
                const response = await contract.stake(options)
                console.log("response: ", response)
                
            } catch (error) {
                console.log("erorr: ", error)
            }
        }
    }

    async function handleBalance(){

    
        if (window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(
                contractAddress,
                stakingABI.abi,
                signer,
            )

            try {
                const balance= ethers.formatEther(await contract.getBalance())
                let res = Math.round(balance * 1e4) / 1e4;
                console.log(res);
                setBalance(res)
                
            } catch (error) {
                console.log("erorr: ", error)
            }
        }
    }

    async function handleWithdraw(){
        if (window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(
                contractAddress,
                stakingABI.abi,
                signer,
            )

            try {
                const tx= await contract.withdraw()
                console.log(tx);
            } catch (error) {
                console.log("erorr: ", error)
            }
        }
    }


    async function handleTimeLeft(){
        if (window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(
                contractAddress,
                stakingABI.abi,
                signer,
            )

            try {
                const timeLeft = await contract.timeLeft()
                setTime(String(timeLeft))
                console.log(String(timeLeft))
            } catch (error) {
                console.log("erorr: ", error)
            }
        }
    }

    window.onload = handleBalance
    // window.onload = handleTotalStakers



    return (
        

        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
            {/* <div>
                <Text fontSize="48px" textShadow="0 5px #000000">Staking contract</Text>
                <Text
                fontSize="30px"
                letterSpacing="-5.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000000"
                
                >It's 2023. Stake costs 0.005 ETH. Tungatov Almat, Alizhan Umbetov, Aiym Amangeldiyeva</Text>
            </div> */}
            {isConnected ? (
                <Flex className="create" align="center" justify="cetner">
                    
                    <div 
                    display='flex'
                    gap='20px'>
        <div 
            width="250px"
            border="1px solid #ddd"
            padding="20px"
            border-radius="8px"
            box-shadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            background-color="#ffffff">
            <h3>Stake</h3>
            <Input
                        fontFamily="inherit"
                        width="200px"
                        height="40px"
                        textAlign="center"
                        type="text" 
                        required 
                        value={amount} 
                        onChange={(e)=> setAmount(e.target.value)}/>
            <p>Balance: <span>{balance} ETH</span></p>
            <p>Staking period: <span >{ time } seconds</span> 
            <br></br>
                <a href="#" onClick={handleTimeLeft}><Image src={Restart} boxSize="20px"/></a>
            </p>
            <Button 
                     backgroundColor="#D6517D" 
                     borderRadius="5px"
                     boxShadow="0px 2px 2px 1px #0F0F0F"
                     color="white"
                     cursor="pointer"
                     fontFamily="inherit"
                     padding="15px"
                     marginTop="10px"
                     onClick={handleStake}>Stake</Button>
        </div>

        <div>
            <h3>Withdraw</h3>
            <p>Through one day you will get x2 of your balance </p>
            <Button 
                     backgroundColor="#D6517D" 
                     borderRadius="5px"
                     boxShadow="0px 2px 2px 1px #0F0F0F"
                     color="white"
                     cursor="pointer"
                     fontFamily="inherit"
                     padding="15px"
                     marginTop="10px"
                     onClick={handleWithdraw}>Withdraw</Button>
        </div>
    </div>
                
                </Flex>
                
            ):(
                <p>You must be connected to Stake.</p>
            )}
            
            </Box>
        </Flex>
    )

}

export default MainStake;