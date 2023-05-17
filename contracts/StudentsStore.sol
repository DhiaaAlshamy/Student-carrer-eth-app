pragma solidity  0.5.16;
pragma experimental ABIEncoderV2;

contract StudentsStore {
    
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
        mapping(uint => Semester) semesters;
    }
    
    mapping(uint => Student) students;
    uint public studentCount;
    
     constructor() public {
        addStudent(123, "Alice", "Computer Science", 2021);
        addStudent(456, "Bob", "Mechanical Engineering", 2020);
        addStudent(789, "Charlie", "Electrical Engineering", 2022);
    }
    
    function addStudent(uint universityID, string memory name, string memory program, uint submissionYear) public {
        students[studentCount] = Student(universityID, name, program, submissionYear);
        studentCount++;
    }
    
    function addSemester(uint studentIndex, uint year, uint numberOfCourses) public {
        students[studentIndex].semesters[year] = Semester(year, numberOfCourses);
    }
    
    function addCourse(uint studentIndex, uint year, uint courseIndex, string memory courseCode, string memory courseName, uint maxGrade, uint studentGrade) public {
        students[studentIndex].semesters[year].courses[courseIndex] = Course(courseCode, courseName, maxGrade, studentGrade);
    }
    
    function getStudent(uint studentIndex) public view returns (uint, string memory, string memory, uint) {
        return (students[studentIndex].universityID, students[studentIndex].name, students[studentIndex].program, students[studentIndex].submissionYear);
    }
    
    function getSemester(uint studentIndex, uint year) public view returns (uint, uint) {
        return (students[studentIndex].semesters[year].year, students[studentIndex].semesters[year].numberOfCourses);
    }
    
    function getCourse(uint studentIndex, uint year, uint courseIndex) public view returns (string memory, string memory, uint, uint) {
        return (students[studentIndex].semesters[year].courses[courseIndex].courseCode, students[studentIndex].semesters[year].courses[courseIndex].courseName, students[studentIndex].semesters[year].courses[courseIndex].maxGrade, students[studentIndex].semesters[year].courses[courseIndex].studentGrade);
    }
    
    function getAllStudents() public view returns (uint[] memory, string[] memory, string[] memory, uint[] memory) {
        uint[] memory universityIDs = new uint[](studentCount);
        string[] memory names = new string[](studentCount);
        string[] memory programs = new string[](studentCount);
        uint[] memory submissionYears = new uint[](studentCount);
        
        for (uint i = 0; i < studentCount; i++) {
            universityIDs[i] = students[i].universityID;
            names[i] = students[i].name;
            programs[i] = students[i].program;
            submissionYears[i] = students[i].submissionYear;
        }
        
        return (universityIDs, names, programs, submissionYears);
    }
}