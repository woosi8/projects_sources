//////////////////////////////// Nav////////////////////////////////

const NavElem = document.querySelector('.navbar');
const NavCon = document.querySelector('.nav-con');
const NavT= document.querySelector('.navbar i');



function NavClick(e){
  NavCon.classList.toggle('nav-contents');
  e.preventDefault();
};

NavElem.addEventListener('click',NavClick);


NavElem.addEventListener('click',function () {
    NavT.classList.toggle('nav-tran');

  
});



//////////////////////////////// Scroll Triger////////////////////////////////
  
  $(function () {
    var trigger = new ScrollTrigger({
      toggle: {
      visible: 'active',
      hidden: 'inactive'
    },
      offset: {
           x: 0,
           y: 300
         },
         once: true
    });
  
  });
  




