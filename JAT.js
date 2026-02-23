const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');

themeToggleBtn.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) {
        themeToggleIcon.classList.remove('fa-moon');
        themeToggleIcon.classList.add('fa-sun');
    } else {
        themeToggleIcon.classList.remove('fa-sun');
        themeToggleIcon.classList.add('fa-moon');
    }
});

let jobsData = [
    { id: 1, companyName: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "none" },
    { id: 2, companyName: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$50,000 - $120,000", description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "none" },
    { id: 3, companyName: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: "$125,000 - $168,000", description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "none" },
    { id: 4, companyName: "CloudFirst Inc", position: "Backend Developer", location: "Seattle, WA", type: "Full-time", salary: "$140,000 - $190,000", description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.", status: "none" },
    { id: 5, companyName: "Innovation Labs", position: "UI/UX Engineer", location: "Austin, TX", type: "Full-time", salary: "$100,000 - $150,000", description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.", status: "none" },
    { id: 6, companyName: "MegaCorp Solutions", position: "JavaScript Developer", location: "New York, NY", type: "Full-time", salary: "$130,000 - $170,000", description: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development.", status: "none" },
    { id: 7, companyName: "StartupXYZ", position: "Full Stack Engineer", location: "Remote", type: "Full-time", salary: "$120,000 - $160,000", description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.", status: "none" },
    { id: 8, companyName: "TechCorp Industries", position: "Senior Frontend Developer", location: "San Francisco, CA", type: "Full-time", salary: "$130,000 - $175,000", description: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team.", status: "none" }
];

let currentTab = 'All';

function updateDashboardCounts() {
    const totalCountEl = document.getElementById('total-count');
    const interviewCountEl = document.getElementById('interview-count');
    const rejectedCountEl = document.getElementById('rejected-count');

    const totalJobs = jobsData.length;
    const interviewJobs = jobsData.filter(job => job.status === 'Interview').length;
    const rejectedJobs = jobsData.filter(job => job.status === 'Rejected').length;

    totalCountEl.innerText = totalJobs;
    interviewCountEl.innerText = interviewJobs;
    rejectedCountEl.innerText = rejectedJobs;
}

function updateJobStatus(jobId, newStatus) {
    const jobIndex = jobsData.findIndex(job => job.id === jobId);
    
    if (jobIndex !== -1) {
        jobsData[jobIndex].status = newStatus;
        updateDashboardCounts();
        switchTab(currentTab); 
    }
}

function deleteJob(jobId) {
    jobsData = jobsData.filter(job => job.id !== jobId);
    
    updateDashboardCounts(); 
    switchTab(currentTab);   
}

function renderJobs(jobsArray) {
    const jobsContainer = document.getElementById('jobs-container');
    const emptyState = document.getElementById('empty-state');
    const tabCount = document.getElementById('tab-count');

    jobsContainer.innerHTML = '';
    tabCount.innerText = jobsArray.length;

    if (jobsArray.length === 0) {
        jobsContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
    } else {
        jobsContainer.classList.remove('hidden');
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');

        jobsArray.forEach(job => {
            const firstLetter = job.companyName.charAt(0).toUpperCase();

            let badgeStyle = "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
            let badgeText = "NOT APPLIED";
            let cardBorder = "border-slate-200 dark:border-slate-700";

            if (job.status === "Interview") {
                badgeStyle = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
                badgeText = "INTERVIEW";
                cardBorder = "border-green-500 dark:border-green-500"; 
            } else if (job.status === "Rejected") {
                badgeStyle = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
                badgeText = "REJECTED";
                cardBorder = "border-red-500 dark:border-red-500"; 
            }

            const cardHTML = `
                <div class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border ${cardBorder} flex flex-col relative transition-colors">
                    
                    <button onclick="deleteJob(${job.id})" class="absolute top-5 right-5 text-slate-400 hover:text-red-500 transition-colors" title="Delete Job">
                        <i class="fa-solid fa-trash-can text-lg"></i>
                    </button>

                    <div class="flex items-start gap-4 mb-4 pr-12">
                        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl shrink-0">
                            ${firstLetter}
                        </div>
                        <div>
                            <h3 class="font-bold text-lg text-slate-800 dark:text-white">${job.position}</h3>
                            <p class="text-slate-500 dark:text-slate-400 font-medium text-sm">${job.companyName}</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs rounded-md border border-slate-100 dark:border-slate-700"><i class="fa-solid fa-location-dot mr-1"></i> ${job.location}</span>
                        <span class="px-2 py-1 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs rounded-md border border-slate-100 dark:border-slate-700"><i class="fa-solid fa-briefcase mr-1"></i> ${job.type}</span>
                        <span class="px-2 py-1 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs rounded-md border border-slate-100 dark:border-slate-700"><i class="fa-solid fa-sack-dollar mr-1"></i> ${job.salary}</span>
                    </div>

                    <div class="mb-4">
                        <span class="inline-block px-3 py-1 text-[11px] font-bold tracking-wider rounded-md ${badgeStyle}">
                            ${badgeText}
                        </span>
                    </div>

                    <p class="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow">
                        ${job.description}
                    </p>

                    <div class="flex gap-3 mt-auto sm:w-1/2 md:w-1/3">
                        <button onclick="updateJobStatus(${job.id}, 'Interview')" class="flex-1 bg-white dark:bg-slate-800 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/50 py-2 rounded-lg font-medium text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">Interview</button>
                        <button onclick="updateJobStatus(${job.id}, 'Rejected')" class="flex-1 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 py-2 rounded-lg font-medium text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Rejected</button>
                    </div>
                </div>
            `;

            jobsContainer.innerHTML += cardHTML;
        });
    }
}

function switchTab(tabName) {
    currentTab = tabName;

    const tabs = ['All', 'Interview', 'Rejected'];
    tabs.forEach(tab => {
        const btn = document.getElementById(`tab-${tab.toLowerCase()}`);
        if (tab === tabName) {
            btn.classList.add('active-tab');
            btn.classList.remove('text-slate-500', 'dark:text-slate-400');
        } else {
            btn.classList.remove('active-tab');
            btn.classList.add('text-slate-500', 'dark:text-slate-400');
        }
    });


    let filteredJobs = [];
    if (tabName === 'All') {
        filteredJobs = jobsData;
    } else {
        filteredJobs = jobsData.filter(job => job.status === tabName);
    }

    renderJobs(filteredJobs);
}


updateDashboardCounts();
switchTab('All');