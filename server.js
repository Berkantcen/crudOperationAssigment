const users = JSON.parse(localStorage.getItem('users')) || []
const tbody = document.getElementById('tblbody')

let members = JSON.parse(localStorage.getItem('users')) || []

//bind json data to html table
bindjsondata()

function bindjsondata() {
  document.getElementById('tblbody').innerHTML = ''
  //iterate through each object in Json array and create row
  members.forEach(function (item, index) {
    var btnEditId = 'btnedit' + item.id
    var btnDeleteId = 'btndelete' + item.id
    var tableRow =
      "<tr Id='" +
      item.id +
      "'   data-CustomerID='" +
      item.id +
      "'   data-MemberName='" +
      item.name +
      "' data-email='" +
      item.email +
      "' data-Password='" +
      item.password +
      "'data-number='" +
      item.number +
      "'>" +
      "<td class='td-data'>" +
      item.name +
      '</td>' +
      "<td class='td-data'>" +
      item.email +
      '</td>' +
      "<td class='td-data'>" +
      item.number +
      '</td>' +
      "<td class='td-data'>" +
      item.password +
      '</td>' +
      "<td class='td-data'>" +
      "<button id='" +
      btnEditId +
      "' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow(" +
      item.id +
      ")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>" +
      "<button id='" +
      btnDeleteId +
      "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteCustomerRow(" +
      item.id +
      ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>" +
      '</td>' +
      '</tr>'
    document.getElementById('tblbody').innerHTML += tableRow
  })

  //add tr for adding record in the table at the bottom
  var AddRow =
    '<tr>' +
    "<td class='td-data'><input type='text' id='txtMemberName' placeholder='name..'></td>" +
    "<td class='td-data'><input type='email' id='txtemail' placeholder='email..'></td>" +
    "<td class='td-data'><input type='email' id='txtNumber' placeholder='number..'></td>" +
    "<td class='td-data'><input type='text' id='txtPassword' placeholder='password'></td>" +
    "<td class='td-data'>" +
    "<button id= 'btnaddCustomer' onclick='addCustomer()' class='btn btn-success'> <i class='fa fa-plus-circle' aria-hidden='true'></i>Add</button>" +
    '</td>' +
    '</tr>'
  document.getElementById('tblbody').innerHTML += AddRow
}

function CreateUniqueCustomerID() {
  //generate Unique number for Id
  const ID = Date.now()
  return ID
}

function addCustomer() {
  var customerID = CreateUniqueCustomerID()
  var memberName = document.getElementById('txtMemberName').value
  if (!memberName) {
    alert('Please enter name!')
    return false
  }
  var email = document.getElementById('txtemail').value
  if (!email) {
    alert('Please enter email!')
    return false
  }
  var emailfilter =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!emailfilter.test(email)) {
    alert('Please enter a valid email address!')
    return false
  }

  var password = document.getElementById('txtPassword').value
  if (!password) {
    alert('Please enter password!')
    return false
  }

  var number = document.getElementById('txtNumber').value
  if (!number) {
    alert('Please enter number!')
    return false
  }
  //creating object and push to json array
  members.push({
    id: customerID,
    name: memberName,
    email: email,
    number: number,
    password: password,
  })
  document.getElementById('txtMemberName').value = ''
  document.getElementById('txtemail').value = ''
  document.getElementById('txtPassword').value = ''
  document.getElementById('txtNumber').value = ''

  // send data to local storage
  localStorage.setItem('users', JSON.stringify(members))
  bindjsondata()
}

function showEditRow(CustomerID) {
  //select tr of whose button was clicked
  var CustomerRow = document.getElementById(CustomerID)

  //returns array of all elements with class "row-data" in CustomerRow
  var data = CustomerRow.querySelectorAll('.td-data')

  var memberName = data[0].innerHTML
  var memberEmail = data[1].innerHTML
  var number = data[2].innerHTML
  var password = data[3].innerHTML

  data[0].innerHTML =
    '<input name="txtupdate_MemberName"   id="txtupdate_MemberName" value="' +
    memberName +
    '"/>'
  data[1].innerHTML =
    '<input name="txtupdate_MemberEmail" id="txtupdate_MemberEmail" value="' +
    memberEmail +
    '"/>'
  data[2].innerHTML =
    '<input name="txtupdate_number" id="txtupdate_number" value="' +
    number +
    '"/>'
  data[3].innerHTML =
    '<input name="txtupdate_Password" id="txtupdate_Password" value="' +
    password +
    '"/>'

  data[4].innerHTML =
    "<button class='btn btn-primary btn-xs btn-updateCustomer' onclick='updateCustomers(" +
    CustomerID +
    ")'>" +
    "<i class='fa fa-pencil' aria-hidden='true'></i>Update</button>" +
    "<button class='btn btn-warning btn-xs btn-cancelupdate' onclick='cancelUpdate(" +
    CustomerID +
    ")'><i class='fa fa-times' aria-hidden='true'></i>Cancel</button>" +
    "<button class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteCustomerRow(" +
    CustomerID +
    ")'>" +
    "<i class='fa fa-trash' aria-hidden='true'></i>Delete</button>"
}

function cancelUpdate(CustomerID) {
  var btneditId = 'btnedit' + CustomerID
  var btndeleteId = 'btndelete' + CustomerID

  //select tr of whose button was clicked
  var CustomerRow = document.getElementById(CustomerID)
  var data = CustomerRow.querySelectorAll('.td-data')
  var password = CustomerRow.getAttribute('data-password')
  var memberName = CustomerRow.getAttribute('data-MemberName')
  var number = CustomerRow.getAttribute('data-number')
  var email = CustomerRow.getAttribute('data-email')

  data[0].innerHTML = memberName
  data[1].innerHTML = email
  data[2].innerHTML = number
  data[3].innerHTML = password

  var actionbtn =
    "<button id='" +
    btneditId +
    "' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow(" +
    CustomerID +
    ")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>" +
    "<button id='" +
    btndeleteId +
    "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteCustomerRow(" +
    CustomerID +
    ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>"
  data[4].innerHTML = actionbtn
}
function deleteCustomerRow(CustomerID) {
  //remove object from json array
  members.splice(
    members.findIndex((a) => a.id === CustomerID),
    1
  )
  // send data to local storage
  localStorage.setItem('users', JSON.stringify(members))
  bindjsondata()
}

function updateCustomers(CustomerID) {
  //select tr of whose button was clicked
  var CustomerRow = document.getElementById(CustomerID)
  var data = CustomerRow.querySelectorAll('.td-data')

  var memberName = data[0].querySelector('#txtupdate_MemberName').value
  var email = data[1].querySelector('#txtupdate_MemberEmail').value
  var number = data[2].querySelector('#txtupdate_number').value
  var password = data[3].querySelector('#txtupdate_Password').value

  var customerObJ = members.find((x) => x.id == CustomerID)
  if (customerObJ != null) {
    customerObJ.name = memberName
    customerObJ.email = email
    customerObJ.number = number
    customerObJ.password = password
  }
  // send data to local storage
  localStorage.setItem('users', JSON.stringify(members))

  bindjsondata()
}
