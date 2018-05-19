//Students displayed per page
const STUDENTS_PER_PAGE = 10;

//gets all the students from the list
let $students = $('.student-list li.student-item.cf');


function searchBar(){
    
    let $studentsFiltered = [];

    //Creates the Search Bar
    createSearchBar();

    let $studentNames = $('.student-list li.student-item.cf .student-details h3');
    let $studentEmails = $('.student-list li.student-item.cf .student-details span.email');
    
    $('.student-search button').on('click keyup', () => {
        
        $studentsToDisplay = $students;

        //Gets the user input
        let $userInput = $('.student-search input').val();

        //Loop over all the student names
        for(let i = 0; i < $studentNames.length; i++){
            
            $studentsToDisplay.eq(i).hide();

            //If the user input exist on the name or email from student 
            // then those students are save in the studentsFiltered array
            if(($studentNames.eq(i).text().indexOf($userInput) != -1) ||
                ($studentEmails.eq(i).text().indexOf($userInput) != -1) ){
                
                // adds the students returned for the search
                $studentsFiltered.push($studentsToDisplay.eq(i));
                
                /*
                    There is a problem here if the 
                    search result is greater than 10
                    all the results are displayed
                    The idea is to display only 10 students per page
                    ... to be fixed...
                */ 
                $studentsToDisplay.eq(i).show();
            }
        }

        let numberOfStudentsFound = $studentsFiltered.length;

        console.log(numberOfStudentsFound);

        // if the student filter return a zero 
        // means the student do not exist 
        if($studentsFiltered.length == 0){

            $('.studen-list').empty();

            const  newPageContent = "<h1>No results!</h1>";

            $('.page').append(newPageContent);

        }

       // console.log(studentsFiltered);
        
        //Removes the old pagination
        $('.pagination').remove();

        //creates a new pagination
        appendPageLinks($studentsFiltered);

        //clean the students filtered
        $studentsFiltered = [];
        
    }); 
}

//Create the search bar element
function createSearchBar(){
    
    //Gets the search bar parent
    const $searchParent = $('.page-header');

    //Creates the search bar elements
    const $searchElement = `
        <div class="student-search">
            <input placeholder="Search for students...">
            <button>Search</button>
        </div>
    `;

    //Appends the search
    $searchParent.append($searchElement);
}

//Displays the first 10 students to the screen
function showPage(pageNumber, studentList){

    //Hides all the students in the page 
    for(let i = 0; i < studentList.length; i++){
        
        $(studentList).eq(i).hide();
    }

    //defines the offset for the page acording to the page number
    let offSet = (pageNumber - 1) * STUDENTS_PER_PAGE;

    //Loop the students list starting at the offset number
    for( let i = offSet; i <= studentList.length; i++){
        
        //Only the range between the offset plus 10 is displayed
        //So if the offset starts at 10 the range upper limit would be 19 (limits inclusive)
        // 10, 11, 12, 13 ,14, 15, 16, 17, 18, 19
        if((i >= offSet) && (i <= (offSet + STUDENTS_PER_PAGE -1))){
            
            $(studentList).eq(i).show();
        }
    }
}

// Adds the pagination Links 
function appendPageLinks(studentList){

    // appends the pagination list as child of page div
    $('.page').append(createPaginationLinks(studentList));

    paginationLinkActions(studentList)
    
     
}

//Creates the pagination Element
function createPaginationLinks($studentList) {
    
    //Total pages
    let totalPages = Math.ceil($studentList.length / STUDENTS_PER_PAGE);

    // Pagination hold the element to be append for the number list
    $pagination = '<div class="pagination"><ul>';

    //The loop starts at one otherwise a page number zero would be displayed
    for (let i = 1; i <= totalPages; i++) {

        $pagination += '<li><a>' + i + '</a></li>';
    }
    
    //last part of the pagination element
    $pagination += '</ul></div>';

    return $pagination;
}

function paginationLinkActions(studentList){

    //Select all the links
    let $linkSection = $('.pagination');

    //Click event on the pagination links
    $linkSection.on('click', (event) => {
        
        //Only executed if the target is an anchor
        if(event.target.tagName === "A"){

            //Cast the number inside the 'a' element
            let $pageNumber = $(event.target).text();

            //Adds the active class to the target element
            $(event.target).addClass('active');

            // Removes the active class in case any of the links were clicked before
            $(event.target).parent().siblings().children().removeClass('active');

            //Calls showPage Funciont
            showPage($pageNumber, studentList); 
        }
    });
}


// Displays the first page when the website is loaded
showPage(1, $students);

//Creates the search bar 
searchBar();

//Append the link Section and controls the students
//Displayed on the screen
appendPageLinks($students);
