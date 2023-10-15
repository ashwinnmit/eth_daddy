// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract jarv {

    //uint public count;
    struct userData{
        string name;
        uint256 phNo;
        string gender;
        string email;
        string bloodGroup;
        string ipfsHash;
        bool isSetUp;
    }

    mapping(address => userData) private userMap;
    function setData(string memory _name,
        uint256 _phNo,
        string memory _gender,
        string memory _email,
        string memory _bloodGroup,
        string memory _ipfsHash) public {
            // userData storage data = userMap[msg.sender];
            // data.name = _name;
            // data.phNo = _phNo;
            // data.gender = _gender;
            // data.email = _email;
            // data.bloodGroup = _bloodGroup;
            // data.ipfsHash = _ipfsHash;
            userMap[msg.sender] = userData(_name, _phNo, _gender, _email, _bloodGroup, _ipfsHash, true);
            //count++;
        }
        function getData(address owner) public view returns (userData memory) {
            return userMap[owner];
        }
}
