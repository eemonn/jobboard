// scripts.js

async function fetchJobs() {
    const response = await fetch('jobData.json');
    const jobs = await response.json();
    displayJobs(jobs);
}

function displayJobs(jobs) {
    const jobListings = document.getElementById('job-listings');
    jobListings.innerHTML = ''; // Clear any existing job listings

    jobs.forEach(job => {
        const jobListing = document.createElement('article');
        jobListing.classList.add('job-listing');

        jobListing.innerHTML = `
            <h2>${job.title}</h2>
            <p>Company: ${job.company}</p>
            <p>Location: ${job.location}</p>
            <p>Posted on: ${job.date}</p>
            <a href="#" class="apply-btn" data-job-id="${job.id}">Apply Now</a>
        `;

        jobListings.appendChild(jobListing);
    });
}

function filterJobs(jobs, keyword, location) {
    return jobs.filter(job =>
        (!keyword || job.title.toLowerCase().includes(keyword.toLowerCase())) &&
        (!location || job.location.toLowerCase().includes(location.toLowerCase()))
    );
}

// Fetch and display jobs when the page loads
fetchJobs().then(jobs => {
    const jobSearchForm = document.getElementById('job-search-form');

    jobSearchForm.addEventListener('submit', event => {
        event.preventDefault();

        const keyword = document.getElementById('keyword').value.trim();
        const location = document.getElementById('location').value.trim();

        const filteredJobs = filterJobs(jobs, keyword, location);
        displayJobs(filteredJobs);
    });
});

