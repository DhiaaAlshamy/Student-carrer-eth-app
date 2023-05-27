pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

import "./UsersStore.sol";

contract StudentsStore {
    address public usersStoreAddress;

    struct Semester {
        uint year;
        uint numberOfCourses;
        mapping(uint => Course) courses;
    }

    struct Course {
        string courseCode;
        string courseName;
        uint maxGrade;
        uint studentGrade;
    }

    struct Student {
        uint universityID;
        string name;
        string program;
        uint submissionYear;
        address publicAddress;
        mapping(uint => Semester) semesters;
    }

    mapping(uint => Student) students;
    uint public studentCount;

    constructor(address _usersStoreAddress) public {
        usersStoreAddress = _usersStoreAddress;
        // Additional initialization code if needed
    }

    function addStudent(uint universityID, string memory name, string memory program, uint submissionYear, string memory email, address publicAddress) public {
        students[studentCount] = Student(universityID, name, program, submissionYear, publicAddress);
        studentCount++;

        UsersStore usersStore = UsersStore(usersStoreAddress);
        usersStore.addUser(publicAddress, name, email, "Student");
    }

    function addSemester(uint studentIndex, uint year, uint numberOfCourses) public {
        students[studentIndex].semesters[year] = Semester(year, numberOfCourses);
    }

    function addCourse(uint studentIndex, uint year, uint courseIndex, string memory courseCode, string memory courseName, uint maxGrade, uint studentGrade) public {
        students[studentIndex].semesters[year].courses[courseIndex] = Course(courseCode, courseName, maxGrade, studentGrade);
    }

    function getStudent(uint studentIndex) public view returns (uint, string memory, string memory, uint, address) {
        return (students[studentIndex].universityID, students[studentIndex].name, students[studentIndex].program, students[studentIndex].submissionYear, students[studentIndex].publicAddress);
    }

    function getSemester(uint studentIndex, uint year) public view returns (uint, uint) {
        return (students[studentIndex].semesters[year].year, students[studentIndex].semesters[year].numberOfCourses);
    }

    function getCourse(uint studentIndex, uint year, uint courseIndex) public view returns (string memory, string memory, uint, uint) {
        return (students[studentIndex].semesters[year].courses[courseIndex].courseCode, students[studentIndex].semesters[year].courses[courseIndex].courseName, students[studentIndex].semesters[year].courses[courseIndex].maxGrade, students[studentIndex].semesters[year].courses[courseIndex].studentGrade);
    }

    function getAllStudents() public view returns (uint[] memory, string[] memory, string[] memory, uint[] memory, address[] memory) {
        uint[] memory universityIDs = new uint[](studentCount);
        string[] memory names = new string[](studentCount);
        string[] memory programs = new string[](studentCount);
        uint[] memory submissionYears = new uint[](studentCount);
        address[] memory publicAddresses = new address[](studentCount);

        for (uint i = 0; i < studentCount; i++) {
            universityIDs[i] = students[i].universityID;
            names[i] = students[i].name;
            programs[i] = students[i].program;
            submissionYears[i] = students[i].submissionYear;
            publicAddresses[i] = students[i].publicAddress;
        }

        return (universityIDs, names, programs, submissionYears, publicAddresses);
    }
}
