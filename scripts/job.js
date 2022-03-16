class Job {
    constructor(jobId, jobName, createdDate, deadline, status, employer, location) {
        this.jobId = jobId;
        this.jobName = jobName;
        this.createdDate = createdDate;
        this.deadline = deadline;
        this.status = status;
        this.employer = employer;
        this.location = location;
    }
}

const statusList = [
    "Published",
    "Inprogress",
    "Pending"
]

const jobs = [
    new Job(1, "Fix bug", "2022-03-16", "2022-05-16", "Published", "Thi Phạm", "28 Nguyễn Tri Phương"),
    new Job(2, "Analytic", "2022-03-16", "2022-05-16", "Inprogress", "Hân Nguyễn", "28 Nguyễn Tri Phương"),
    new Job(3, "Implement", "2022-03-16", "2022-05-16", "Pending", "Triết Nguyễn", "28 Nguyễn Tri Phương"),
    new Job(4, "Testing", "2022-03-16", "2022-05-16", "Inprogress", "Hằng Đinh", "28 Nguyễn Tri Phương"),
    new Job(5, "Review", "2022-03-16", "2022-05-16", "Inprogress", "Khoa Nguyễn", "28 Nguyễn Tri Phương"),
]

function renderJobs() {
    let htmls = jobs.map(function (job) {
        return `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>JID-${job.jobId}</td>
                    <td>${job.jobName}</td>
                    <td>${job.createdDate}</td>
                    <td>${job.deadline}</td>
                    <td>${job.status}</td>
                    <td>${job.employer}</td>
                    <td>${job.location}</td>
                    <td>
                        <i class="fa fa-trash danger" onclick="removeJob(${job.jobId})"></i>
                        <i class="fa fa-edit" onclick="removeJob(${job.jobId})"></i>
                    </td>
                </tr>
                `
    })
    document.querySelector("#tbJobs>tbody").innerHTML = htmls.join("")
}

function initStatusList() {
    let htmls = statusList.map(function (status) {
        return `<option value="${status}">${status}</option>`
    })
    document.querySelector("#status").innerHTML = htmls.join("");
}

function createJob() {
    let jobName = document.querySelector("#jobName").value;
    let createdDate = document.querySelector("#createdDate").value;
    let deadline = document.querySelector("#deadline").value;
    let status = document.querySelector("#status").value;
    let employer = document.querySelector("#employer").value;
    let location = document.querySelector("#location").value;
    let currentMaxJobId = findMaxJobId();
    let job = new Job(currentMaxJobId + 1, jobName, createdDate, deadline, status, employer, location);

    jobs.push(job);
    renderJobs();
    clearForm();
}

function findMaxJobId() {
    let tempJobs = [...jobs];
    tempJobs.sort(function (job1, job2) {
        return job2.jobId - job1.jobId;
    })
    return tempJobs[0].jobId;
}

function removeJob(jobId) {
    let confirmed = window.confirm("Are you sure you want to remove this job?");
    if(confirmed){
        let position = jobs.findIndex(function (job) {
            return job.jobId === jobId;
        })
        jobs.splice(position, 1);
        renderJobs();
    }
}

function clearForm(){
    document.querySelector("#jobName").value ="";
    document.querySelector("#createdDate").value ="";
    document.querySelector("#deadline").value ="";
    document.querySelector("#status").value = statusList[0];
    document.querySelector("#employer").value = "";
    document.querySelector("#location").value = "";
}
// IIFE
// document ready
(function () {
    renderJobs()
    initStatusList();
})()