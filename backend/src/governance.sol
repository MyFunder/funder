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
     uint MINIMUMAPPROVAL = 20;


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
     /**
     * @notice vote for the beneficiary that requested for fund
     * @param castVote the beneficiary address
     * @param amount the amount of token to use in vote
     */
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

     /**
     * @notice lock the token that has been used to vote for a beneficiary
     * @param castVote the beneficiary address
     * @param _amount the amount of token to lock
     */
    function lockToken(uint _amount, address castVote) private {
      tokenOwners[msg.sender][castVote]+= _amount;
      lockedToken[msg.sender] += _amount;
    }

     /**
     * @notice Unlock the token that has been used to vote for a beneficiary
     * @param castVote the beneficiary address
     */
    function unLockToken(address castVote) external returns(uint){
      require(govVoteCount[msg.sender][castVote] >= MINIMUMAPPROVAL, "This voting is still on going");
      uint256 value =  tokenOwners[msg.sender][castVote];
      lockedToken[msg.sender] -= value;
      tokenOwners[msg.sender][castVote]-= value;
      emit unlock(msg.sender, value);
      return value;

    }

    /*******************VIEW FUNCTIONS************************/
     /**
     * @notice check the status of voting count for a beneficiaryVote
     * @return status return the status of the vote if it has passed or not
     **/

    function getBeneficiaryVotingStatus(address beneficiary) public view returns(bool status){
      status = RequestGranted[beneficiary];

    }

 

}