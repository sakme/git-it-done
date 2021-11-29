var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

// fetch repo issues
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    console.log()

    fetch(apiUrl)
        .then(function(response) {
            //request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayIssues(data);

                    // check if api has paginated results
                    if (response.headers.get("Link")) {
                        displayWarning(repo);
                    }
                });
            } else {
                alert("There was a problem with your request!");
            }
        })
        .catch(function(error) {
            // apppend error notice
            alert("Unable to connect to GitHub");
        });
};

// display issues on page
var displayIssues = function(issues) {
    // check for issues
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    // loop through issues
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take user to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between aligh-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append title to container
        issueEl.appendChild(titleEl);

        // create type element
        var typeEl = document.createElement("span");

        // check if issue is an issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append type to container
        issueEl.appendChild(typeEl);

        // append issue to container
        issueContainerEl.appendChild(issueEl);
    }   
};

// display warning
var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit: ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("expressjs/express");