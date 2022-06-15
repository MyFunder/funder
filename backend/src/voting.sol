// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;
import "./funderGovToken.sol";
import "./funder.sol";

/*
  * @title Funder logic for raising funds .
  * @notice  web3 version of crowdFundMe.
  */

contract Voting {
     /*******************sTATE VARIABLES************************/
     FunderGovToken govToken;
     Funder funder;
     uint aYesVote;
     uint MINIMUMAPPROVAL = 200e18;

  /*******************MAPPING************************/
     mapping (address => mapping(address => bool))public govVote;
    mapping (address => mapping(address => uint))public govVoteCount;

     /*******************EVENTS************************/  
     event Voted(address indexed gov, address indexed ben);
     event unlock(address indexed owner, bool indexed _status);


     /*******************CONSTRUCTOR************************/  
     constructor(FunderGovToken _token, uint _aYesVote, Funder _funder){
        govToken = _token;
        aYesVote = _aYesVote;
        funder = _funder;

     }

     /******************* Goven_ance FUNCTIONS************************/  
     function voteProposal(address castVote, uint amount) external {
         require(govToken.balanceOf(msg.sender) >= amount, "insufficient balance");
         require(aYesVote % amount == 0, "10 tokens is 1 yes");
         assert(!(govVote[msg.sender][castVote]));
         uint noOfVote = amount / aYesVote;
         govToken.lockToken(amount, castVote);
         govVoteCount[msg.sender][castVote] += noOfVote;
         if(govVoteCount[msg.sender][castVote] >= MINIMUMAPPROVAL){
            funder.setStatus(castVote);       
            
         }
         emit Voted(msg.sender, castVote);
     }

      function unLocked( address castVote) public{
          bool result =  funder.getBeneficiaryStatus(castVote);
          assert(result == true);
          govToken.unLockToken(castVote);
          emit unlock(msg.sender, result);
      
  }


}