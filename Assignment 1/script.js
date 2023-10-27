/* Card */
const detailsElements = document.querySelectorAll('details');

detailsElements.forEach(details => {
    const summary = details.querySelector('summary');
    
    details.addEventListener('toggle', function() {
        if (details.open) {
            summary.classList.add('open');
        } else {
            summary.classList.remove('open');
        }
    });
});


/* Menu */
const topNavLinks = document.querySelectorAll('.top-nav a');
const bottomNavLinks = document.querySelectorAll('.bottom-nav a');

// Set default for Menu 1
topNavLinks[0].classList.add('selected-top');
bottomNavLinks[0].classList.add('selected-bottom');

function handleMenuClick(index) {
    // Remove all "selected" class from all menu
    topNavLinks.forEach(link => link.classList.remove('selected-top'));
    bottomNavLinks.forEach(link => link.classList.remove('selected-bottom'));

    // Add "selected" class for selected menu
    topNavLinks[index].classList.add('selected-top');
    bottomNavLinks[index].classList.add('selected-bottom');
}

topNavLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        handleMenuClick(index);
    });
});

bottomNavLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        handleMenuClick(index);
    });
});


/* Form */
const selectedProducts = [];

function toggleSelection(element) {
    let productName = element.children[1].textContent;
    
    if (!element.classList.contains('selected-product')) {
        element.classList.add('selected-product');
    } else {
        element.classList.remove('selected-product');
    }
}

const form = document.getElementById("form");
const fullnameInput = document.getElementById("fullname");
const addressInput = document.getElementById("address");
const phoneInput = document.getElementById("phone");
const dateInput = document.getElementById("date");
const emailInput = document.getElementById("email");

const fullnameError = document.getElementById("fullname-error");
const addressError = document.getElementById("address-error");
const genderError = document.getElementById("gender-error");
const phoneError = document.getElementById("phone-error");
const dateError = document.getElementById("date-error");
const emailError = document.getElementById("email-error");

let isFormValid = true;

function resetAll() {
    isFormValid = true;

    fullnameInput.value = "";
    fullnameError.textContent = "";
    fullnameInput.classList.remove("invalid");
    addressInput.value = "";
    addressError.textContent = "";
    addressInput.classList.remove("invalid");
    phoneInput.value = "";
    phoneError.textContent = "";
    phoneInput.classList.remove("invalid");
    dateInput.value = "";
    dateError.textContent = "";
    dateInput.classList.remove("invalid");
    emailInput.value = "";
    emailError.textContent = "";
    emailInput.classList.remove("invalid");

    document.getElementById("male").checked = false;
    document.getElementById("female").checked = false;

    const productElements = document.querySelectorAll('.product');
    productElements.forEach(element => {
        element.classList.remove("selected-product")
    });

    selectedProducts.splice(0);
    removeAllProducts();
}

// Hàm kiểm tra họ tên có ít nhất 2 từ
function validateName(input, errorDiv) {
    var value = input.value.trim();
    if (value.split(" ").length < 2) {
        errorDiv.textContent = "* Họ tên cần ít nhất 2 từ";
        input.classList.add("invalid");
        isFormValid = false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
    }
}

// Hàm kiểm tra địa chỉ có ít nhất 2 từ
function validateAddress(input, errorDiv) {
    var value = input.value.trim();
    if (value.split(" ").length < 2) {
        errorDiv.textContent = "* Địa chỉ cần ít nhất 2 từ";
        input.classList.add("invalid");
        isFormValid = false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
    }
}

// Hàm kiểm tra số điện thoại có 10 ký số và bắt đầu bằng 0
function validatePhone(input, errorDiv) {
    var value = input.value.trim();
    if (!/^[0][0-9]{9}$/.test(value)) {
        errorDiv.textContent = "* Điện thoại phải có 10 số và bắt đầu bằng 0";
        input.classList.add("invalid");
        isFormValid = false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
    }
}

// Hàm kiểm tra giới tính
function validateGender(errorDiv) {
    var genderInputs = document.querySelectorAll('input[name="gender"]');
    var selectedGender = Array.from(genderInputs).some(input => input.checked);
    if (!selectedGender) {
        errorDiv.textContent = "* Vui lòng chọn giới tính";
        isFormValid = false;
    } else {
        errorDiv.textContent = "";
    }
}

// Hàm kiểm tra ngày không được sau ngày hiện tại
function validateDate(input, errorDiv) {
    var currentDate = new Date();
    var selectedDate = new Date(input.value);

    if (!input.value.trim()) {
        errorDiv.textContent = "* Ngày đăng ký không được để trống";
        input.classList.add("invalid");
        isFormValid = false;
    } else if (selectedDate < currentDate) {
        errorDiv.textContent = "* Ngày đăng ký không được trước ngày hiện tại";
        input.classList.add("invalid");
        isFormValid = false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
    }
}

// Hàm kiểm tra định dạng email
function validateEmail(input, errorDiv) {
    var value = input.value.trim();
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        errorDiv.textContent = "* Email không hợp lệ";
        input.classList.add("invalid");
        isFormValid = false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
    }
}

function validateForm() {
    isFormValid = true;

    fullnameError.textContent = "";
    fullnameInput.classList.remove("invalid");
    addressError.textContent = "";
    addressInput.classList.remove("invalid");
    phoneError.textContent = "";
    phoneInput.classList.remove("invalid");
    dateError.textContent = "";
    dateInput.classList.remove("invalid");
    emailError.textContent = "";
    emailInput.classList.remove("invalid");

    validateName(fullnameInput, fullnameError);
    validateAddress(addressInput, addressError);
    validateGender(genderError);
    validatePhone(phoneInput, phoneError);
    validateDate(dateInput, dateError);
    validateEmail(emailInput, emailError);

    if (!isFormValid) {
        return false;
    }

    return true;
}

function formatDate(inputDate) {
    var dateParts = inputDate.split("-");
    var formattedDate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    return formattedDate;
}

function register() {
    if (!validateForm()) {
        return;
    }

    var fullName = document.getElementById("fullname").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var address = document.getElementById("address").value;
    var deliveryDate = formatDate(document.getElementById("date").value);
    var product = selectedProducts.join('; ');

    var newRow = document.createElement("tr");

    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var cell4 = document.createElement("td");
    var cell5 = document.createElement("td");

    cell1.textContent = fullName;
    cell2.textContent = gender;
    cell3.textContent = address;
    cell4.textContent = deliveryDate;
    cell5.textContent = product;

    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);
    newRow.appendChild(cell4);
    newRow.appendChild(cell5);

    document.getElementById("table-body").appendChild(newRow);

    // Store the information in sessionStorage
    const data = {
        fullName: fullName,
        gender: gender,
        address: address,
        deliveryDate: deliveryDate,
        product: product
    };

    // Check if there is data in sessionStorage or not
    var existingData = sessionStorage.getItem("userData");
    var userData = existingData ? JSON.parse(existingData) : [];

    // Add the new data to the array
    userData.push(data);

    // Store the updated array in sessionStorage
    sessionStorage.setItem("userData", JSON.stringify(userData));

    alert("Đăng ký thành công!");
    resetAll();
}

function addProduct() {
    var selectedProductElements = document.querySelectorAll('.product.selected-product');
    selectedProductElements.forEach(element => {
        element.classList.remove('selected-product');
        selectedProducts.push(element.children[1].textContent);
        document.getElementById('ordered-container').appendChild(element);
    });
}

function addAllProducts() {
    var productElements = document.querySelectorAll('.product');
    productElements.forEach(element => {
        selectedProducts.push(element.children[1].textContent);
        document.getElementById('ordered-container').appendChild(element);
    });
}

function removeProduct() {
    var selectedProductElements = document.querySelectorAll('#ordered-container .product.selected-product');
    selectedProductElements.forEach(function (productElement) {
        productElement.classList.remove('selected-product');
        var productName = productElement.children[1].textContent;
        selectedProducts.splice(selectedProducts.indexOf(productName), 1);
        document.getElementById('product-container').appendChild(productElement);
    });
}

function removeAllProducts() {
    var orderedProductElements = document.querySelectorAll('#ordered-container .product');
    orderedProductElements.forEach(function (productElement) {
        var productName = productElement.children[1].textContent;
        selectedProducts.splice(selectedProducts.indexOf(productName), 1);
        document.getElementById('product-container').appendChild(productElement);
    });
}

const containers = document.querySelectorAll('.container');
const draggables = document.querySelectorAll('.product');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
    });

    container.addEventListener('drop', e => {
        const draggable = document.querySelector('.dragging');
        const targetContainer = container;

        if (draggable && targetContainer.classList.contains('container')) {
            targetContainer.appendChild(draggable);
            draggable.classList.remove('dragging');

            const productName = draggable.children[1].textContent;
            const targetContainerId = targetContainer.id;

            if (targetContainerId == "ordered-container") {
                draggable.classList.remove('selected-product');
                selectedProducts.push(productName);
            }

            if (targetContainerId == "product-container") {
                draggable.classList.remove('selected-product');
                selectedProducts.splice(selectedProducts.indexOf(productName), 1);
            }

            const lastItem = targetContainer.lastChild;
            targetContainer.insertBefore(draggable, lastItem.nextSibling);

            targetContainer.scrollTop = targetContainer.scrollHeight;
        }
    });
});

