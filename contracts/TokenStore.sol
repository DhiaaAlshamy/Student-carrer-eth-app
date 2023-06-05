pragma solidity ^0.8.0;

contract TokenStore {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply;
        balances[msg.sender] = _totalSupply;

        // Set allowance for the first account
        allowances[msg.sender][msg.sender] = _totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_value <= balances[msg.sender], "Insufficient balance");

        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool) {
        require(_value <= balances[_from], "Insufficient balance");
        require(_value <= allowances[_from][msg.sender], "Insufficient allowance");

        balances[_from] -= _value;
        balances[_to] += _value;
        allowances[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function mintTokensAndSetAllowance(
        address _to,
        uint256 _tokenAmount,
        address _spender,
        uint256 _allowanceAmount
    ) external {
        balances[_to] += _tokenAmount;
        allowances[_to][_spender] = _allowanceAmount;
        totalSupply += _tokenAmount;
        emit Transfer(address(0), _to, _tokenAmount);
        emit Approval(_to, _spender, _allowanceAmount);
    }
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
 function allowance(address owner, address spender) public view returns (uint256) {
        return allowances[owner][spender];
    }
}
