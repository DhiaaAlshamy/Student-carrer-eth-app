pragma solidity ^0.8.0;

import "./UsersStore.sol";
import "./TokenStore.sol";

contract StudentsStore {
    address public usersStoreAddress;
    address public tokenContractAddress;

    struct Course {
        string courseCode;
        string courseName;
        uint maxGrade;
        uint studentGrade;
    }

    struct Semester {
        uint id;
        mapping(string => Course) courses;
        string[] courseCodes;
    }

    struct Student {
        uint universityID;
        string name;
        string program;
        uint submissionYear;
        address publicAddress;
        string email;
        uint[] semesterIDs;
        mapping(uint => Semester) semesters;
    }

    struct SimpleStudent {
        uint universityID;
        string name;
        string program;
        uint submissionYear;
        string email;
        address publicAddress;
    }

    constructor(address _usersStoreAddress, address _tokenContractAddress) {
        usersStoreAddress = _usersStoreAddress;
        tokenContractAddress = _tokenContractAddress;
    }

    mapping(uint => Student) public students;
    uint[] public studentIDs;

    mapping(uint => mapping(address => bool)) private tokenAllowance;

    function addStudent(
        uint _universityID,
        string memory _name,
        string memory _program,
        uint _submissionYear,
        string memory _email,
        address _publicAddress,
        uint256 _initialTokenAmount
    ) public {
        Student storage student = students[_universityID];
        student.universityID = _universityID;
        student.name = _name;
        student.program = _program;
        student.submissionYear = _submissionYear;
        student.publicAddress = _publicAddress;
        student.email = _email;
        studentIDs.push(_universityID);

        // Set initial balance and allowance for the student
        TokenStore tokenContract = TokenStore(tokenContractAddress);
        tokenContract.mintTokensAndSetAllowance(_publicAddress, _initialTokenAmount, msg.sender, _initialTokenAmount);

        UsersStore usersStore = UsersStore(usersStoreAddress);
        usersStore.addUser(_publicAddress, _name, _email, "Student");
    }

    function addSemester(uint _universityID, uint _semesterID) public {
        Student storage student = students[_universityID];

        // Check if the semester ID already exists in the semesterIDs array
        for (uint i = 0; i < student.semesterIDs.length; i++) {
            if (student.semesterIDs[i] == _semesterID) {
                revert("Semester already added");
            }
        }

        // Add the semester ID to the array and set the semester ID in the semesters mapping
        student.semesterIDs.push(_semesterID);
        student.semesters[_semesterID].id = _semesterID;
    }

    function addCourse(
        uint _universityID,
        uint _semesterID,
        string memory _courseCode,
        string memory _courseName,
        uint _maxGrade,
        uint _studentGrade
    ) public {
        Student storage student = students[_universityID];
        Semester storage semester = student.semesters[_semesterID];
        semester.courses[_courseCode] = Course(_courseCode, _courseName, _maxGrade, _studentGrade);
        semester.courseCodes.push(_courseCode); // Add the course code to the array
    }

    function getStudentCourses(uint _universityID, uint _semesterID) public view returns (string[] memory) {
        Student storage student = students[_universityID];
        Semester storage semester = student.semesters[_semesterID];

        // Retrieve the course codes from the semester mapping
        string[] memory courseCodes = new string[](semester.courseCodes.length);
        for (uint i = 0; i < semester.courseCodes.length; i++) {
            courseCodes[i] = semester.courses[semester.courseCodes[i]].courseCode;
        }

        return courseCodes;
    }

    function getStudentCourse(
        uint _universityID,
        uint _semesterID,
        string memory _courseCode
    ) public view returns (Course memory) {
        Student storage student = students[_universityID];
        return student.semesters[_semesterID].courses[_courseCode];
    }

    function getStudentInfo(uint _universityID) public view returns (
        uint universityID,
        string memory name,
        string memory program,
        uint submissionYear,
        address publicAddress,
        uint[] memory semesterIDs
    ) {
        Student storage student = students[_universityID];
        universityID = student.universityID;
        name = student.name;
        program = student.program;
        submissionYear = student.submissionYear;
        publicAddress = student.publicAddress;

        uint numSemesters = student.semesterIDs.length;
        semesterIDs = new uint[](numSemesters);

        for (uint i = 0; i < numSemesters; i++) {
            semesterIDs[i] = student.semesterIDs[i];
        }
    }

    function getStudents() public view returns (SimpleStudent[] memory) {
        // Create an array to store the students
        SimpleStudent[] memory allStudents = new SimpleStudent[](studentIDs.length);

        // Add the students to the array
        for (uint i = 0; i < studentIDs.length; i++) {
            Student storage student = students[studentIDs[i]];
            allStudents[i] = SimpleStudent(
                student.universityID,
                student.name,
                student.program,
                student.submissionYear,
                student.email,
                student.publicAddress
            );
        }

        return allStudents;
    }

    function showStudentInfoByToken(uint _universityID) public view returns (
    uint universityID,
    string memory name,
    string memory program,
    uint submissionYear,
    address publicAddress,
    uint[] memory semesterIDs
) {
    // Check if the employer has a token
     TokenStore tokoenContract = TokenStore(tokenContractAddress);
    require(tokoenContract.balanceOf(msg.sender) > 0, "No token balance");
    
    require(tokenAllowance[_universityID][msg.sender], "Token allowance not granted");


        Student storage student = students[_universityID];
        universityID = student.universityID;
        name = student.name;
        program = student.program;
        submissionYear = student.submissionYear;
        publicAddress = student.publicAddress;
        semesterIDs = student.semesterIDs;
    }

    function grantTokenAllowance(uint _universityID, address _employer) public {
        require(studentExists(_universityID), "Student does not exist");
        require(msg.sender == students[_universityID].publicAddress, "Not authorized");

        tokenAllowance[_universityID][_employer] = true;
    }

    function studentExists(uint _universityID) private view returns (bool) {
        return students[_universityID].universityID == _universityID;
    }
}