# AlertBoxDemo
Custom design alert box - Material theme

#Description

Here is a material design alert box. AlertBox is created using ui-bootstrap. This is just for creative purpose and nothing out of ordinary.
Although it is simple to use.


#Dependecies

angularjs
ui-bootstrap

#How to use
1. Copy the AlertBox folder in your app folder.
2. Include alertbox.js and alertbox.css in your html
3. In controller, add 'AlertService' and 'AlertType' as dependencies.
4. To show alert, 
      
      AlertService.alert('Heading', 'Your Message', AlertType.SUCCESS)
5. Done!


#AlertType

AlertType.SUCCESS  - success
AlertType.WARNING - warning
AlertType.DANGER - danger
AlertType.INFO - info
AlertType.DEFAULT - default



