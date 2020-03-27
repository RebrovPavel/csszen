let selectorData = {
  element: null,
};

let elements = [];
let selector;
let pos = 0;
let DOM = false;

let parentChildren = [];
let parent = null;
let firstChild = null;

function backlight(element) {
  if (selectorData.element != null) {
    selectorData.element.style.outline = selectorData.outline != null ? selectorData.outline : null;
    selectorData.element.style.backgroundColor = selectorData.background != null ? selectorData.background : null;
  }

  if (element !== null) {
    selectorData.element = element;
    selectorData.outline = element.style.outline;
    selectorData.background = element.style.backgroundColor;
    selector = element;
    selector.style.outline = 'solid red 5px';
    selector.style.backgroundColor = 'lightblue';
  } else {
    selectorData = {};
  }
}

function checkButtons() {
  selector = document.body.querySelector('.selector-next'); // NEXT SELECTOR BUTTON CHECK
  if (pos < elements.length - 1 && !DOM) {
    selector.disabled = false;
  } else {
    selector.disabled = true;
  }

  selector = document.body.querySelector('.selector-prev'); // PREV SELECTOR BUTTON CHECK
  if (pos > 0 && !DOM) {
    selector.disabled = false;
  } else {
    selector.disabled = true;
  }

  selector = document.body.querySelector('.nav-top'); // PARRENT BUTTON CHECK
  if (parent != null) {
    selector.disabled = false;
  } else {
    selector.disabled = true;
  }

  selector = document.body.querySelector('.nav-bottom'); // CHILD BUTTON CHECK
  if (firstChild != null) {
    selector.disabled = false;
  } else {
    selector.disabled = true;
  }

  selector = document.body.querySelector('.nav-left'); // PREV NEIGHBOR BUTTON CHECK
  if (parentChildren.indexOf(selectorData.element) > 0) {
    selector.disabled = false;
  } else {
    selector.disabled = true;
  }

  selector = document.body.querySelector('.nav-right'); // NEXT NEIGHBOR BUTTON CHECK
  if (parentChildren.indexOf(selectorData.element) < parentChildren.length - 1) {
    selector.disabled = false;
  } else {
    selector.disabled = true;
  }
}

function select(element) {
  if (element != null) {
    backlight(element);
    if (element.firstElementChild != null) {
      // FIND CHILD
      firstChild = element.firstElementChild;
    } else {
      firstChild = null;
    }

    if (element.parentElement != null) {
      // FIND PARENT
      parent = element.parentElement;
      parentChildren = [...parent.children];
    } else {
      parent = null;
      parentChildren = [];
    }
  } else {
    backlight(null);
    parentChildren = [];
    parent = null;
    firstChild = null;
  }
}

selector = document.body.querySelector('.selector-find'); // SELECTOR BUTTON
selector.addEventListener('click', () => {
  elements = [];
  pos = 0;
  DOM = false;

  const { value } = document.body.querySelector('.selector');
  if (value !== '') {
    elements = [...document.body.querySelectorAll(value)];
    select(elements[pos]);
  }
  checkButtons();
});

selector = document.body.querySelector('.selector-next'); // NEXT SELECTOR BUTTON EVENT
selector.addEventListener('click', () => {
  pos += 1;
  select(elements[pos]);
  checkButtons();
});

selector = document.body.querySelector('.selector-prev'); // PREV SELECTOR BUTTON EVENT
selector.addEventListener('click', () => {
  pos -= 1;
  select(elements[pos]);
  checkButtons();
});

selector = document.body.querySelector('.nav-top'); // PARENT BUTTON EVENT
selector.addEventListener('click', () => {
  DOM = true;
  select(parent);
  checkButtons();
});

selector = document.body.querySelector('.nav-bottom'); // CHILD BUTTON EVENT
selector.addEventListener('click', () => {
  DOM = true;
  select(firstChild);
  checkButtons();
});

selector = document.body.querySelector('.nav-left'); // PREV NEIGHBOR BUTTON EVENT
selector.addEventListener('click', () => {
  DOM = true;
  pos = parentChildren.indexOf(selectorData.element);
  select(parentChildren[pos - 1]);
  checkButtons();
});

selector = document.body.querySelector('.nav-right'); // PREV NEIGHBOR BUTTON EVENT
selector.addEventListener('click', () => {
  DOM = true;
  pos = parentChildren.indexOf(selectorData.element);
  select(parentChildren[pos + 1]);
  checkButtons();
});
