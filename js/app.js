//Students displayed per page
const STUDENTS_PER_PAGE = 10;

//gets all the students from the list
let $students = $('.student-list li.student-item.cf');

//Displays the first 10 students to the screen
function showPage(pageNumber, studentList){

    //Hides all the students in the page 
    for(let i = 0; i < studentList.length; i++){
        
        studentList.eq(i).hide();
    }

    //defines the offset for the page acording to the page number
    let offSet = (pageNumber - 1) * STUDENTS_PER_PAGE;

    //Loop the students list starting at the offset number
    for( let i = offSet; i <= studentList.length; i++){
        
        //Only the range between the offset plus 10 is displayed
        //So if the offset starts at 10 the range upper limit would be 19 (limits inclusive)
        // 10, 11, 12, 13 ,14, 15, 16, 17, 18, 19
        if((i >= offSet) && (i <= (offSet + STUDENTS_PER_PAGE -1))){
            
            studentList.eq(i).show();
        }
    }
}

//
function appendPageLinks(studentList){

    //Total pages
    let totalPages = Math.ceil(studentList.length / STUDENTS_PER_PAGE);

    // Pagination hold the element to be append for the number list
    $pagination = '<div class="pagination"><ul>';

    //The loop starts at one otherwise a page number zero would be displayed
    for(let i = 1; i <= totalPages; i++){

        $pagination += '<li><a>' + i + '</a></li>'
    }

    //last part of the pagination element
    $pagination += '</ul></div>';

    // appends the pagination list as child of page div
    $('.page').append($pagination);

    
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

//Append the link Section and controls the students
//Displayed on the screen
appendPageLinks($students);
