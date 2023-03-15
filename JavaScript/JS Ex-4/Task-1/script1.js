    // Printing current time
        window.onload =function startTime() {
            let time = new Date();
            let h = time.getHours();
            let m = time.getMinutes();
            let s = time.getSeconds();
            h=add_zero(h);
            m=add_zero(m);
            s=add_zero(s);
            function add_zero(i)
            {
                if(i<10)
                i="0"+i
                return (i);
            }
            (document.getElementById('time').innerHTML = "Time "+": " +h + ":" + m + ":" + s)
            setInterval(startTime, 1000);
        }


        // Printing curent date
        let date=new Date()
        let months=['January','February','March','April','May','June','July','August','September','October','November','December'];
        let month = months[date.getMonth()];
        (document.getElementById('date').innerText="Date "+": "+ date.getDate()+" "+month+" "+date.getFullYear())
        

        //StopWatch

        let hr=0;
        let min=0;
        let sec=0;
        let count=0;
        let timer =false;            // Timer is stop
        document.getElementById("start").disabled = false;
        document.getElementById("resume").disabled = true;
        document.getElementById("stop").disabled = true;
        document.getElementById("reset").disabled = true;
        function watch()            // Function to start counter
        {
            if(timer==true)
            {
                count=count+1;          //Increasing counter by 1
                if(count==100)          //If counter reaches 100, increase second by 1 
                {
                    sec=sec+1;
                    count=0;
                }
                if(sec>59)             //If second reaches 60, increase minute by 1 
                {
                    min=min+1;
                    sec=0;
                }
                if(min>59)             //If minutes reaches 60, increase hour by 1 
                {
                    hr=hr+1;
                    min=0;
                }
                function func(i)        
                {
                    if(i<10)
                    i="0"+i;        // to print two digit number (00)
                    return (i);
                }
                document.getElementById("hr").innerText=func(hr);
                document.getElementById("min").innerText=func(min);
                document.getElementById("sec").innerText=func(sec);
                document.getElementById("count").innerText=func(count);
                setTimeout(watch,10)
            }
            
        }
        function start()       
        {
            timer=true;
            watch();
            document.getElementById("start").disabled = true;
            document.getElementById("stop").disabled = false;
            document.getElementById("reset").disabled = false;
            document.getElementById("resume").disabled = true;
        }
        function stop()         
        {
            timer =false;  
            document.getElementById("start").disabled = true;
            document.getElementById("stop").disabled = true;
            document.getElementById("reset").disabled = false;
            document.getElementById("resume").disabled = false;
            
        }
        function resume()
        {
            timer=true;
            watch();
            document.getElementById("start").disabled = true;
            document.getElementById("stop").disabled = false;
            document.getElementById("reset").disabled = false;
            document.getElementById("resume").disabled = true;
        }
        function reset()
        {
            timer =false;  
            hr=0;
            min=0;
            sec=0;
            count=0;
            document.getElementById("hr").innerText="00";
            document.getElementById("min").innerText="00";
            document.getElementById("sec").innerText="00";
            document.getElementById("count").innerText="00";
            document.getElementById("start").disabled = false;
            document.getElementById("resume").disabled = true;
        }
    