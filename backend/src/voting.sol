// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;
import "./funderGovToken.sol";
import "./funder.sol";

/*
  * @title Funder logic for raising funds .
  * @notice  web3 version of crowdFundMe.
  */

contract Voting is FunderGovToken{
     /*******************sTATE VARIABLES************************/
     Funder funder;
     uint aYesVote;
     uint MINIMUMAPPROVAL = 200e18;




  /*******************MAPPING************************/
    mapping (address => mapping(address => bool))public govVote;
    mapping (address => mapping(address => uint))public govVoteCount;




     /*******************EVENTS************************/  
     event Voted(address indexed gov, address indexed ben);
     event unlock(address indexed owner, bool indexed _status);




     /*******************MODIFIER************************/  
      modifier checkUnlockToken(address owner, uint amount){
      uint valueLocked = lockedToken[msg.sender];
      uint bal = balanceOf(owner);
      require(valueLocked + amount < bal, "you don't have token to vote");

      _;
  }





     /*******************CONSTRUCTOR************************/  
     constructor(uint _aYesVote, Funder _funder) FunderGovToken("MYFunder","MYF"){
        aYesVote = _aYesVote;
        funder = _funder;
        _mint(msg.sender, 1000000e18);


     }

     /******************* Goven_ance FUNCTIONS************************/  
         
     function voteProposal(address castVote, uint amount) external checkUnlockToken(msg.sender, amount) {
         require(aYesVote % amount == 0, "10 tokens is 1 yes");
         assert(!(govVote[msg.sender][castVote]));
         uint noOfVote = amount / aYesVote;
         lockToken(amount, castVote);
         govVoteCount[msg.sender][castVote] += noOfVote;
         if(govVoteCount[msg.sender][castVote] >= MINIMUMAPPROVAL){
            funder.setStatus(castVote);   //this is not working yet    
            
         }
         emit Voted(msg.sender, castVote);
     }


     function lockToken(uint _amount, address castVote) private {
      tokenOwners[msg.sender][castVote]+= _amount;
      lockedToken[msg.sender] += _amount;
  }
  function unLockToken(address castVote) private{
      uint256 value =  tokenOwners[msg.sender][castVote];
      lockedToken[msg.sender] -= value;
      tokenOwners[msg.sender][castVote]-= value;

  }

      function unLocked( address castVote) external{
          bool result =  funder.getBeneficiaryStatus(castVote);
          assert(result == true);
          unLockToken(castVote);
          emit unlock(msg.sender, result);
      
  }
 

}