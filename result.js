var timeOnQuestionIth = JSON.parse(localStorage.timeOnQuestionIth);
localStorage.isSubmit = 1;
function drawChart() {
    var chart = new CanvasJS.Chart("chart-div", {
        animationEnabled: true,
        theme: "light2", 
        title:{
            text: "Time Consuming"
        },
        axisY: {
            title: "Time"
        },
        data: [{        
            type: "column",  
            dataPoints: [      
                { y: timeOnQuestionIth[1], label: "Question 1" },
                { y: timeOnQuestionIth[2],  label: "Question 2" },
                { y: timeOnQuestionIth[3],  label: "Question 3" },
                { y: timeOnQuestionIth[4],  label: "Question 4" },
                { y: timeOnQuestionIth[5],  label: "Question 5" },
            ]
        }]
    });
    chart.render();
}

drawChart();