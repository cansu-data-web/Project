var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
   

var pageInit = function() {
  $http.get('/ticketlist').success(function(response) {
    $scope.ticketlist = response;
    $scope.ticket = "";
  });
};


$scope.OpenPopupCreate = function () {
  //  $scope.clear();
    $('#mdlCreate').modal('show');
  };



pageInit();


var handleFileSelect = function (evt) {
  var files = evt.target.files;
  var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload = function (readerEvt) {
          var binaryString = readerEvt.target.result;
          $scope.files.fileContent = document.getElementById("base64textarea").value = btoa(binaryString);
          // document.getElementById("filename").value =  file.name;
          $scope.files.fileName = file.name;
      };

      reader.readAsBinaryString(file);


  }
};

if (window.File && window.FileReader && window.FileList && window.Blob) {
  document.getElementById('document').addEventListener('change', handleFileSelect, false);

} else {

}



$scope.addTicket = function() {
   
  $http.post('/ticketlist', $scope.ticket).success(function(response) {
    console.log(response);
    pageInit();
  });
};



$scope.remove = function(id) {
  console.log(id);
  $http.delete('/ticketlist/' + id).success(function(response) {
    pageInit();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/ticketlist/' + id).success(function(response) {
    $scope.ticket = response;
  });
};  

$scope.update = function() {
  console.log($scope.ticket._id);
  $http.put('/ticketlist/' + $scope.ticket._id, $scope.ticket).success(function(response) {
    refresh();
  })
};

$scope.clear = function() {
  $scope.ticket = "";
  document.getElementById('document').value = null;

}

}]);