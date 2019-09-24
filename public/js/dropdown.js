if (typeof jQuery !== "function") {
    throw new Error("my-boot基于JQuery,先引入jQuery")
} else {
    $("[data-trigger=dropdown]").parent()
        .hover(
            function() {
                $(this).children(".dropdown-menu").toggleClass("in");
            }
        )
}