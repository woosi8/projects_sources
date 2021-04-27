$(function () {
  var trigger = new ScrollTrigger({
    toggle: {
      visible: "active",
      hidden: "inactive",
    },
    offset: {
      x: 0,
      y: 300,
    },
    once: true,
  });
});
