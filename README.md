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
