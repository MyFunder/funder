// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "../funder.sol";
import "../funderGovToken.sol";
import "../voting.sol";
import "forge-std/Test.sol";
import "forge-std/Vm.sol";


contract funderTest is Test{
    Funder funder;
    function setUp() public {
        // funder = new Funder();
    }



    

    function testcheckBalance() public {
        // address donator = 0x27E936b199a8EEb3980c468fc1802f1Ef78b1625;
        // address beneficiary = 0x8dBdB1C7eFF1255D771D3C5a63FA39f111Cb4327;
        // vm.deal(donator, 1 ether);
        // vm.prank(beneficiary);
        // funder.requestFund("food", 0.1 ether);
        // vm.prank(donator);
        // funder.donateFunds{value: 0.1 ether}(beneficiary);

        // // vm.stopPrank();
        // funder.checkBalanceOf(beneficiary);
        // require(funder.checkBalanceOf(beneficiary)== 0.1 ether, "wrong");
    }
}
