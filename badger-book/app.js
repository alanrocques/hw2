
let students = [];

fetch("https://cs571api.cs.wisc.edu/rest/f24/hw2/students", {
  headers: {
    "X-CS571-ID": CS571.getBadgerId()
  }
})
  .then(res => {
    if (res.status === 200 || res.status === 304) {
      return res.json();
    } else {
      throw new Error("Failed to fetch students data");
    }
  })
  .then(data => {
    students = data;
    buildStudents(students); 
  })
  .catch(err => console.error(err));

  function handleSearch(e) {
	e?.preventDefault(); 
  
	const nameSearch = document.getElementById("search-name").value.trim().toLowerCase();
	const majorSearch = document.getElementById("search-major").value.trim().toLowerCase();
	const interestSearch = document.getElementById("search-interest").value.trim().toLowerCase();
  
	
	const filteredStudents = students.filter(student => {
	  
	  const fullName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;
	  
	 
	  const matchesName = !nameSearch || fullName.includes(nameSearch);
	  const matchesMajor = !majorSearch || student.major.toLowerCase().includes(majorSearch);
	  
	  
	  const matchesInterest = !interestSearch || student.interests.some(interest =>
		interest.toLowerCase().includes(interestSearch)
	  );
  
	 
	  return matchesName && matchesMajor && matchesInterest;
	});
  
	
	buildStudents(filteredStudents);
  }
  
  
  document.getElementById("search-btn").addEventListener("click", handleSearch);
  
  
  function buildStudents(studs) {
	const studentContainer = document.getElementById("students");
	studentContainer.innerHTML = ""; 
  
	studs.forEach(student => {
	  const studentDiv = document.createElement("div");
	  studentDiv.className = "col-12 col-md-6 col-lg-4 col-xl-3"; 
  
	  const name = document.createElement("h3");
	  name.innerText = `${student.name.first} ${student.name.last}`;
  
	  const major = document.createElement("p");
	  major.innerText = `Major: ${student.major}`;
  
	  const credits = document.createElement("p");
	  credits.innerText = `Credits: ${student.numCredits}`;
  
	  const isFromWI = document.createElement("p");
	  isFromWI.innerText = `From WI: ${student.fromWisconsin ? 'Yes' : 'No'}`;
  
	  
	  const interestsList = document.createElement("ul");
	  student.interests.forEach(interest => {
		const interestItem = document.createElement("li");
  
		
		interestItem.innerText = interest;
  
		
		interestItem.addEventListener("click", (e) => {
		  const selectedText = e.target.innerText.toLowerCase(); 
  
		  
		  document.getElementById("search-name").value = "";
		  document.getElementById("search-major").value = "";
  
		 
		  document.getElementById("search-interest").value = selectedText;
  
		  
		  handleSearch();
		});
  
		interestsList.appendChild(interestItem);
	  });
  
	  
	  studentDiv.appendChild(name);
	  studentDiv.appendChild(major);
	  studentDiv.appendChild(credits);
	  studentDiv.appendChild(isFromWI);
	  studentDiv.appendChild(interestsList);
  
	  
	  studentContainer.appendChild(studentDiv);
	});
  
	
	document.getElementById("num-results").textContent = studs.length;
  }
  