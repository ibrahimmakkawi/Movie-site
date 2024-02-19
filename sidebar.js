"use strict";

import { api_key, fetchDataFromServer } from "./api.js";

export function sidebar() {
  const genreList = {};
  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }

      genreLink();
    }
  );

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");
  sidebarInner.innerHTML = `
    <div class="sidebar-list">
      <p class="title">Genre</p>
    </div>
    <div class="sidebar-list">
      <p class="title">Language</p>
      <a href="movie-list.html" menu-close class="sidebar-link">English</a>
      <a href="movie-list.html" menu-close class="sidebar-link">French</a>
      <a href="movie-list.html" menu-close class="sidebar-link">Arabic</a>
      <a href="movie-list.html" menu-close class="sidebar-link">Hindi</a>
      <a href="movie-list.html" menu-close class="sidebar-link">Spanish</a>
      <a href="movie-list.html" menu-close class="sidebar-link">Turkish</a>
    </div>
    <div class="sidebar-footer">
      <p class="Copyright">Copyright 2024 <a href="">@ibrahimmakkawi</a></p>
      <img
        src="imgs/IMDB_Logo_2016.svg.png"
        width="100"
        height="10"
        alt="the movie database logo"
      />
    </div>
  `;

  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "./movie-list.html");
      link.setAttribute("menu-close", "");
      //     link.setAttribute('one');
      //     link.setAttribute('onclick',`getMovieList('with-genres=${genreId}','${genreName}')` );
      //
      link.textContent = genreName;
      sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
    }

    const sidebar = document.querySelector("[sidebar]");
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };

  const toggleSidebar = function (sidebar) {
    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarToggler = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelector("[overlay]");

    sidebarToggler.forEach(function (element) {
      element.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        sidebarBtn.classList.toggle("active");
        overlay.classList.toggle("active");
      });
    });

    sidebarClose.forEach(function (element) {
      element.addEventListener("click", function () {
        sidebar.classList.remove("active");
        sidebarBtn.classList.remove("active");
        overlay.classList.remove("active");
      });
    });
  };
}
