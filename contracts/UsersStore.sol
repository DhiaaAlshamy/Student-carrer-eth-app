pragma solidity  0.8.0;
pragma experimental ABIEncoderV2;


contract UsersStore {
    struct User {
        uint id;
        address publicAddress;
        string name;
        string email;
        string role;
    }

    User[] public users;
    uint public nextUserId = 1;

    constructor() public {
        // addUser(address(0x123), "John Doe", "john@example.com", "Admin");
        // addUser(address(0x456), "Jane Smith", "jane@example.com", "User");
        // addUser(address(0x789), "Bob Johnson", "bob@example.com", "User");
    }

    function addUser(address _publicAddress, string memory _name, string memory _email, string memory _role) public {
        require(!userExists(_publicAddress), "User already exists");

        User memory newUser = User({
            id: nextUserId,
            publicAddress: _publicAddress,
            name: _name,
            email: _email,
            role: _role
        });

        users.push(newUser);
        nextUserId++;
    }

    function userExists(address _publicAddress) private view returns (bool) {
        for (uint i = 0; i < users.length; i++) {
            if (users[i].publicAddress == _publicAddress) {
                return true;
            }
        }
        return false;
    }

    function getUser(uint index) public view returns (uint, address, string memory, string memory, string memory) {
        require(index < users.length, "User does not exist");

        User memory user = users[index];
        return (user.id, user.publicAddress, user.name, user.email, user.role);
    }

    function getAllUsers() public view returns (User[] memory) {
        return users;
    }
}
