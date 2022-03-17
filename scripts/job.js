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

var statusList = [];

var jobs = [];

const jobData = "jobData";
const statusData = "statusData";


function init() {
    // chưa có
    if (getLocalStorage(jobData) == null) {
        jobs = [
            new Job(1, "Fix bug", "2022-03-16", "2022-05-16", "Published", "Thi Phạm", "28 Nguyễn Tri Phương"),
            new Job(2, "Analytic", "2022-03-16", "2022-05-16", "Inprogress", "Hân Nguyễn", "28 Nguyễn Tri Phương"),
            new Job(3, "Implement", "2022-03-16", "2022-05-16", "Pending", "Triết Nguyễn", "28 Nguyễn Tri Phương"),
            new Job(4, "Testing", "2022-03-16", "2022-05-16", "Inprogress", "Hằng Đinh", "28 Nguyễn Tri Phương"),
            new Job(5, "Review", "2022-03-16", "2022-05-16", "Inprogress", "Khoa Nguyễn", "28 Nguyễn Tri Phương"),
        ]
        // localStorage.setItem(jobData, JSON.stringify(jobs))
        setLocalStorage(jobData, jobs);
    }
    else {
        jobs = getLocalStorage(jobData)
    }
}
// kiểm tra xem đã có key chưa?
// Nếu có thì lấy dữ liệu đang lưu trữ trọng key
// Nếu chưa có thì tạo key ra và sedding 1 số dữ liệu

function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function renderJobs() {
    let htmls = jobs.map(function (job) {
        return `
                <tr id="tr_${job.jobId}">
                    <td><input type="checkbox"></td>
                    <td>JID-${job.jobId}</td>
                    <td>${job.jobName}</td>
                    <td>${job.createdDate}</td>
                    <td>${job.deadline}</td>
                    <td>${job.status}</td>
                    <td>${job.employer}</td>
                    <td>${job.location}</td>
                    <td>
                        <i title="Remove job" class="fa fa-trash danger" onclick="removeJob(${job.jobId})"></i>
                        <i title="Modify job" class="fa fa-edit success" onclick="getJob(${job.jobId})"></i>
                        <i title="Update job" class="fa fa-save waring d-none" onclick="updateJob(${job.jobId})"></i>
                        <i title="Cancel" class="fa fa-window-close danger d-none" onclick="resetFields(${job.jobId})"></i>
                    </td>
                </tr>
                `
    })
    document.querySelector("#tbJobs>tbody").innerHTML = htmls.join("")
}

function initStatusList() {
    if (getLocalStorage(statusData) == null) {
        setLocalStorage(statusData, [
            "Published",
            "Inprogress",
            "Pending"
        ]);
    }
    else {
        statusList = getLocalStorage(statusData);
    }
}

function buildStatusList(elementId) {
    let htmls = statusList.map(function (status) {
        return `<option value="${status}">${status}</option>`
    })
    document.querySelector(elementId).innerHTML = htmls.join("");
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
    setLocalStorage(jobData, jobs);
    // localStorage.setItem(jobData, JSON.stringify(jobs))
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
    if (confirmed) {
        let position = jobs.findIndex(function (job) {
            return job.jobId === jobId;
        })
        jobs.splice(position, 1);
        renderJobs();
    }
}

function clearForm() {
    document.querySelector("#jobName").value = "";
    document.querySelector("#createdDate").value = "";
    document.querySelector("#deadline").value = "";
    document.querySelector("#status").value = statusList[0];
    document.querySelector("#employer").value = "";
    document.querySelector("#location").value = "";
}

function getJobByJobId(jobId) {
    return jobs.find(function (job) {
        return job.jobId == jobId
    })
}
function getJob(jobId) {
    let job = getJobByJobId(jobId);
    let tr = document.querySelector(`#tr_${jobId}`);
    let deadline = tr.children[4];
    let status = tr.children[5];
    deadline.innerHTML = `<input type="date" class="form-control-sm" id="deadline_${jobId}" value="${job.deadline}">`
    status.innerHTML = `<select id="status_${jobId}" class="form-control-sm"></select>`;
    buildStatusList(`#status_${jobId}`);
    let employer = tr.children[6];
    employer.innerHTML = `<input type="text" class="form-control-md" id="employer_${jobId}" value="${job.employer}">`
    let location = tr.children[7];
    location.innerHTML = `<input type="text" class="form-control" id="location_${jobId}" value="${job.location}">`;
    let actions = tr.children[8];
    let btnModify = actions.children[1];
    btnModify.classList.add("d-none");
    let btnUpdate = actions.children[2];
    btnUpdate.classList.remove("d-none");
    let btnCancel = actions.children[3];
    btnCancel.classList.remove("d-none");
}

function resetFields(jobId) {
    let job = getJobByJobId(jobId);
    let tr = document.querySelector(`#tr_${jobId}`);
    let deadline = tr.children[4];
    let status = tr.children[5];
    deadline.innerHTML = `${job.deadline}`
    status.innerHTML = `${job.status}`;
    let employer = tr.children[6];
    employer.innerHTML = `${job.employer}`
    let location = tr.children[7];
    location.innerHTML = `${job.location}`;
    let actions = tr.children[8];
    let btnModify = actions.children[1];
    btnModify.classList.remove("d-none");
    let btnUpdate = actions.children[2];
    btnUpdate.classList.add("d-none");
    let btnCancel = actions.children[3];
    btnCancel.classList.add("d-none");
}

function updateJob(jobId){
    // lấy job theo Id
    let job = getJobByJobId(jobId);
    // gán lại giá trị các thuộc tinh tương ứng trong job
    let newDeadline = document.querySelector(`#deadline_${jobId}`).value;
    let newStatus = document.querySelector(`#status_${jobId}`).value;
    let newEmployer = document.querySelector(`#employer_${jobId}`).value;
    let newLocation = document.querySelector(`#location_${jobId}`).value;

    job.deadline = newDeadline;
    job.status = newStatus;
    job.employer = newEmployer;
    job.location = newLocation;
    // cập nhật localstorage
    setLocalStorage(jobData, jobs);
    // render
    // renderJobs();
    resetFields(jobId)
}
// IIFE
// document ready
(function () {
    init();
    initStatusList();
    renderJobs();
    buildStatusList("#status");
})()