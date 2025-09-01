// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CitizenData {
    struct Document {
        string cid;
        string category;
    }

    // user => category => list of docs
    mapping(address => mapping(string => string[])) private documents;

    // owner => user => access granted?
    mapping(address => mapping(address => bool)) private access;

    // owner => list of granted users
    mapping(address => address[]) private accessList;

    event DocumentUploaded(address indexed user, string cid, string category);
    event AccessGranted(address indexed owner, address indexed user);
    event AccessRevoked(address indexed owner, address indexed user);

    // Upload document
    function uploadDocument(string memory _cid, string memory _category) external {
        documents[msg.sender][_category].push(_cid);
        emit DocumentUploaded(msg.sender, _cid, _category);
    }

    // Get docs for self or if access granted
    function getDocuments(address _owner, string memory _category) external view returns (string[] memory) {
        require(msg.sender == _owner || access[_owner][msg.sender], "No access");
        return documents[_owner][_category];
    }

    // Grant access
    function grantAccess(address _user) external {
        require(!access[msg.sender][_user], "Already granted");

        access[msg.sender][_user] = true;
        accessList[msg.sender].push(_user);

        emit AccessGranted(msg.sender, _user);
    }

    // Revoke access
    function revokeAccess(address _user) external {
        require(access[msg.sender][_user], "Not granted yet");

        access[msg.sender][_user] = false;

        // Remove from accessList
        address[] storage users = accessList[msg.sender];
        for (uint i = 0; i < users.length; i++) {
            if (users[i] == _user) {
                users[i] = users[users.length - 1];
                users.pop();
                break;
            }
        }

        emit AccessRevoked(msg.sender, _user);
    }

    // Check if user has access
    function checkAccess(address _owner, address _user) external view returns (bool) {
        return access[_owner][_user];
    }

    // Get full list of accounts with access
    function getAccessList(address _owner) external view returns (address[] memory) {
        return accessList[_owner];
    }
}
