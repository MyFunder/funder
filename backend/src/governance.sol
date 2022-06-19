// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;
import "./funderGovToken.sol";

/*
  * @title Funder logic for raising funds .
  * @notice  web3 version of crowdFundMe.
  */

contract Voting is FunderGovToken{
     /*******************sTATE VARIABLES************************/
     uint aYesVote;
     uint MINIMUMAPPROVAL = 10;


  /*******************MAPPING************************/
    mapping (address => mapping(address => bool))public govVote;
    mapping (address => mapping(address => uint))public govVoteCount;
    mapping (address => bool) public RequestGranted;

     /*******************EVENTS************************/  
     event Voted(address indexed gov, address indexed ben);
     event unlock(address indexed owner, uint indexed _amount);




     /*******************MODIFIER************************/  
      modifier checkUnlockToken(address owner, uint amount){
      uint valueLocked = lockedToken[msg.sender];
      uint bal = balanceOf(owner);
      require(valueLocked + amount < bal, "you don't have token to vote");
      _;
  }


     /*******************CONSTRUCTOR************************/  
     constructor(uint _aYesVote) FunderGovToken("MYFunder","MYF"){
        aYesVote = _aYesVote;
        _mint(msg.sender, 1000000e18);


     }

     /******************* Govenance FUNCTIONS************************/  
         
     function voteProposal(address castVote, uint amount) external checkUnlockToken(msg.sender, amount) {
         require(amount  % aYesVote == 0, "10 tokens is 1 yes");
         assert(!(govVote[msg.sender][castVote]));
         uint noOfVote = amount / aYesVote;
         lockToken(amount, castVote);
         govVoteCount[msg.sender][castVote] += noOfVote;
         if(govVoteCount[msg.sender][castVote] >= MINIMUMAPPROVAL){
            RequestGranted[castVote] = true;   
         }
         emit Voted(msg.sender, castVote);
     }


     function lockToken(uint _amount, address castVote) private {
      tokenOwners[msg.sender][castVote]+= _amount;
      lockedToken[msg.sender] += _amount;
  }
  function unLockToken(address castVote) private returns(uint){
      uint256 value =  tokenOwners[msg.sender][castVote];
      lockedToken[msg.sender] -= value;
      tokenOwners[msg.sender][castVote]-= value;
      return value;

  }

      function unLocked( address castVote) external{
          require(govVoteCount[msg.sender][castVote] >= MINIMUMAPPROVAL, "This voting is still on going");
          uint value = unLockToken(castVote);
          emit unlock(msg.sender, value);
      
  }

  /*******************VIEW FUNCTIONS************************/
  function getBeneficiaryVotingStatus(address beneficiary) public view returns(bool status){
    status = RequestGranted[beneficiary];

  }

 

}