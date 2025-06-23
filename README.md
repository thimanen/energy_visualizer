# Energy flow visualizer for smart home project
## Project goal
The project will implement a mobile application to visualise energy flows provided by the energy meter server. The mobile application will provide views for the amount of instantaneous energy flows as well as views for historical energy flows.

The objective is to create a mobile application with React Native and EXPO framework to request and present hourly/daily/weekly/monthly/yearly energy flows. The aim is to provide graphical visualization both to current power and historical energy flows. Since the energy meter system will operate inside a local network which is not exposed externally (no public IP address), the mobile application will use the free hosted MongoDB database directly to fetch historical data. Presentation of current data is only possible within local network.


## work hour log
|date|time|total|activity|Next|
|:----:|:----:|:----:|:----:|:----:|
|23.5.|2|2|Start finally the React native /EXPO project for visualizing the Energy meter data|kick-start the project and implement first barchart with mock data|
|25.5.|7|9|First bargraph on hourly data! Had to change from using the Victory package, as I did not get it working with React-native and EXPO. Now using react-native-chart-kit.|A lot of chart configuration and theming to be done. react-native-chart-kit is rather clumsy to configure and make respond to tooltips. I need to look into other alternatives such as react-native-svg-charts |
|26.5.|8|17|Changed to using react-native-gifted-charts and managed to implement first view for one day hourly energy flows. Theming of the chart started. Studying the million props for gifted-charts--- Created the title for the application and some more theming and styling|Next task is to format (theme) the graphs more and start to prepare the whole view layout of the application|
27-28.5.|6|23|Implemented PlantData component to show weather data (now just mock-ups) and Pressable address to show GoogleMaps location of the plant (house)|Implement functionality to fetch real energy data from server. Implement functionality to change the day|
|29.5.|5|28|Implemented a useHourlyData hook to fetch hourly data per date from server. Also created a simple textInput to change the date and verífy that loading works for all dates.|Next taslk is to implement a simple date picker. I am thinking of a simple horizontal scrollView|
|30.5.|4|32|Implemented first version of date picker. Horizontal ScrollView... far from satisfactory still.|Next I need to work with the server again. I need a GET routes for weekly and monthly data. Also need to reduce the logging to console.|
|31.5.|6|38|Date picker now works and can select the daily graph to show. The current month is also visible and initial version of calendar mode selector (day, week, month, year)|Server update...|
|1.6.|2|40|Finished the calendar mode selection. It is now using same styles as the day calendar.|Server update...|
|2.6.|3|43|Week graph implemented. Given any date, the graph is pulled for that week.|Next month and year views and respective GET routes|
|4.6.|4|47|Modified the date selector andstudied building standalone Android app|TODO: 1 GET weekly, 2 GET monthly. 3 Weather data in plant image. 4 Aggregated energy generation in plant image. 5 Instantaneous energy flow in plat image. 6 Tooltips to barchar to indicate values when individual bar is pressed. 7 Authentication|
|5.6.|4|51|Managed to build standalone Android app, but it is still not possible to fetch data with HTTP. With mobile browser it works i.e. firewall has a hole..|TODO same as yesterday. Get data fetch working for standalone application|
|6.6.|2|53|Updated some color styles as parts of the application colors were different in stabdalkone app than in EXPO GO development environment.|same as yesterday|
|7.6.|4|57|Added task 3: weather data on main screen; current temperature in Oulu and weather icon from OpenMeteo.com | TODO: 1 GET weekly, 2 GET monthly. 4 Aggregated energy generation in plant image. 5 Instantaneous energy flow in plat image. 6 Tooltips to barchar to indicate values when individual bar is pressed. 7 Authentication|
|8.6.|2|59| Added task 5 instantaneous energy flow to main screen. It now shows the energy produced by solar station during the last minute | TODO: 1 GET weekly, 2 GET monthly. 4 Aggregated energy generation in plant image. 6 Tooltips to barchar to indicate values when individual bar is pressed. 7 Authentication|
|18.6.|2|61|Set an interval in fetchCurrentData to update current solar energy production once per minute|TODO: 1 GET weekly, 2 GET monthly. 4 Aggregated energy generation in plant image. 6 Tooltips to barchar to indicate values when individual bar is pressed. 7 Authentication|
|23.6.|4|65|Change current energy to current max power. Add a tooltip / label to show the values of the daily enerflows when pressing the bar.|TODO: 1 GET weekly, 2 GET monthly. 4 Aggregated energy generation in plant image. 7 Authentication|
