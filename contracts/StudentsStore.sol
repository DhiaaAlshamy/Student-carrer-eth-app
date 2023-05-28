pragma solidity ^0.8.0;
import "./usersStore.sol";

contract StudentsStore {
    address public usersStoreAddress;

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
        uint[] semesterIDs; // Added field to store semester IDs
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

    constructor(address _usersStoreAddress) public {
        usersStoreAddress = _usersStoreAddress;
    }

    mapping(uint => Student) public students;
    uint[] public studentIDs;

    function addStudent(
        uint _universityID,
        string memory _name,
        string memory _program,
        uint _submissionYear,
        string memory _email,
        address _publicAddress
    ) public {
        Student storage student = students[_universityID];
        student.universityID = _universityID;
        student.name = _name;
        student.program = _program;
        student.submissionYear = _submissionYear;
        student.publicAddress = _publicAddress;
        studentIDs.push(_universityID);
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
}
