"use client";
import React, { useState, useEffect, useRef, use } from "react";
import "./service.css";
import { useParams } from "react-router-dom";

export default function ServicePage({ serviceData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchable, setSearchable] = useState(false);
  const [polygons, setPolygons] = useState([]);
  const [numPolygons, setNumPolygons] = useState(0);
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);
  const autocomplete = useRef(null);
  const drawingManager = useRef(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const servicesList = [
    "Lawn Mowing",
    "Leaf Removal",
    "Hedge Trimming",
    "Lawn Fertilization",
    "Weed Control",
    "Mulching",
    "Seeding",
    "Aeration",
    "Snow Removal",
    "Pest Control",
  ];

  useEffect(() => {
    if (currentPage === 2) {
      // Initialize Google Maps Autocomplete when on the service details page
      initAutocomplete();
    }
  }, [currentPage]);

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }

  const isActiveCheckpoint = (page) => {
    return currentPage >= page ? "active-progress" : "";
  };

  const isActiveProgressBar = (page) => {
    return currentPage > page ? "active-progress" : "";
  };

  const isActiveProgressText = (page) => {
    if (currentPage >= page) {
      return "activated-progress-text";
    }
    return "";
  };

  const isActiveFontSize = (page) => {
    return currentPage === page ? "active-progress-text" : "";
  };

  const toggleServiceSelection = (service) => {
    setSelectedServices((prevServices) => {
      if (prevServices.includes(service)) {
        return prevServices.filter((s) => s !== service);
      } else {
        return [...prevServices, service];
      }
    });
  };

  const isServiceSelected = (service) => {
    return selectedServices.includes(service);
  };

  // Function to initialize autocomplete
  const initAutocomplete = () => {
    if (window.google) {
      autocomplete.current = new window.google.maps.places.Autocomplete(
        searchBoxRef.current,
        {
          componentRestrictions: { country: "us" },
          fields: ["geometry"],
        }
      );

      autocomplete.current.addListener("place_changed", addressSelected);

      searchBoxRef.current.addEventListener("input", () => {
        setSearchable(false);
      });

      searchBoxRef.current.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.stopImmediatePropagation();
          if (searchable) {
            search();
          }
        }
      });
    }
  };

  const addressSelected = () => {
    setSearchable(true);
    search();
    searchBoxRef.current.focus();
  };

  const search = () => {
    if (searchable) {
      const place = autocomplete.current.getPlace();
      const longitude = place.geometry.location.lng();
      const latitude = place.geometry.location.lat();

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 21,
        minZoom: 17,
        maxZoom: 21,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeId: "satellite",
        tilt: 0,
        restriction: {
          latLngBounds: {
            north: latitude + 0.005,
            south: latitude - 0.005,
            east: longitude + 0.005,
            west: longitude - 0.005,
          },
          strictBounds: true,
        },
      });

      drawingManager.current = new window.google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
        },
        polygonOptions: {
          fillColor: "#FF0000",
          fillOpacity: 0.5,
          strokeWeight: 3,
          clickable: true,
          editable: false,
          zIndex: 1,
        },
      });

      drawingManager.current.setMap(map);

      window.google.maps.event.addListener(
        drawingManager.current,
        "polygoncomplete",
        (newPolygon) => {
          const polygon = newPolygon;
          polygon.id = numPolygons;
          setNumPolygons(numPolygons + 1);
          setPolygons((prevPolygons) => [...prevPolygons, polygon]);

          window.google.maps.event.addListener(polygon, "click", () => {
            setPolygons((prevPolygons) =>
              prevPolygons.filter((poly) => poly.id !== polygon.id)
            );
            polygon.setMap(null);
          });
        }
      );
    }
  };

  const getQuote = async () => {
    let area = 0;

    polygons.forEach((polygon) => {
      const vertices = polygon.getPath();
      area += window.google.maps.geometry.spherical.computeArea(vertices);
    });

    area *= 10.7639;

    const price = await calculateQuote(area);
    return price;
  };

  const calculateQuote = async (squareFootage) => {
    const data = { squareFootage };

    try {
      const response = await fetch("/userapp/calculate-quote/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error(
          "Network response was not ok:",
          response.status,
          response.statusText
        );
        return;
      }

      const responseData = await response.json();
      console.log("Calculated price:", responseData.price);
      return responseData.price;
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  return (
    <>
      <div className="select-services-page">
        <div className="header">
          <h1 className="title">Company: {serviceData}</h1>
          <div className="overlap-group">
            {Array.from({ length: 4 }).map((_, index) => (
              <React.Fragment key={index}>
                <div
                  className={`checkpoint ${isActiveCheckpoint(index + 1)}`}
                ></div>
                {index < 3 && (
                  <div
                    className={`progress-bar-line ${isActiveProgressBar(
                      index + 1
                    )}`}
                    id={`bar-${index + 1}`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="progress-bar-text">
            {["Services", "Details", "Estimates", "Submit"].map(
              (text, index) => (
                <div className="progress-text-box" key={index}>
                  <div
                    className={`progress-text ${isActiveProgressText(
                      index + 1
                    )} ${isActiveFontSize(index + 1)}`}
                  >
                    {text}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="body">
          <div className="background-image"></div>

          {currentPage === 1 && (
            <div id="service-selector">
              <div className="page-section-title">Select Services To Quote</div>
              <div id="service-selection-columns">
                <div
                  className="service-selection-column"
                  id="service-selection-column"
                >
                  <div className="section-title">Click to Add or Remove</div>
                  <div className="services-rect">
                    <div className="scrollable-services">
                      <div id="services">
                        {servicesList.map((service, index) => (
                          <button
                            key={index}
                            className={`service ${
                              isServiceSelected(service)
                                ? "selected-service"
                                : ""
                            }`}
                            onClick={() => toggleServiceSelection(service)}
                          >
                            <div className="service-text">{service}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="service-selection-column"
                  id="landscape-service-selection-column"
                >
                  <div className="section-title">Selected Services</div>
                  <div className="services-rect">
                    <div className="scrollable-services">
                      <div id="landscape-services">
                        {selectedServices.map((service, index) => (
                          <button
                            key={index}
                            className="added-service"
                            onClick={() => toggleServiceSelection(service)}
                          >
                            <div className="service-text">{service}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="buttons">
                <div></div>
                <button className="next" onClick={nextPage}>
                  <div className="text-wrapper-8">Next</div>
                </button>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div id="service-details">
              <div className="page-section-title">Service Details</div>
              <div id="search-tool">
                <div id="address-search">
                  <div className="section-title" id="address-header">
                    Select Address From Dropdown
                  </div>
                  <input
                    style={{ color: "black" }}
                    id="search"
                    type="text"
                    placeholder="Enter your address"
                    ref={searchBoxRef}
                  />
                </div>
                <div id="area"></div>
              </div>
              <div
                id="map"
                ref={mapRef}
                style={{ width: "95%", height: "350px" }}
              ></div>
              <div className="buttons">
                <button className="back" onClick={prevPage}>
                  <div className="text-wrapper-8">Back</div>
                </button>
                <button className="next" onClick={nextPage}>
                  <div className="text-wrapper-8">Next</div>
                </button>
              </div>
            </div>
          )}

          {currentPage === 3 && (
            <div id="estimates">
              <div className="page-section-title">Estimated Price Range</div>
              <div className="price-range-text">$469.99 - $519.99</div>
              <div id="estimate-selection-column">
                <div className="section-title">Click to Remove</div>
                <div className="services-rect">
                  <div className="scrollable-services" id="estimates-scroller">
                    <div id="service-container">
                      {selectedServices.map((service, index) => (
                        <button
                          key={index}
                          className="service-estimate"
                          onClick={() => toggleServiceSelection(service)}
                        >
                          <div className="service-range-text">{service}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button className="back" onClick={prevPage}>
                  <div className="text-wrapper-8">Back</div>
                </button>
                <button className="next" onClick={nextPage}>
                  <div className="text-wrapper-8">Next</div>
                </button>
              </div>
            </div>
          )}

          {currentPage === 4 && (
            <div id="submit">
              <div className="page-section-title">
                Submit Your Service Request
              </div>
              <div className="price-range-text-2">$469.99 - $519.99</div>
              <div className="add-services">
                <div className="section-title">
                  Enter the following and we will contact you shortly
                </div>
                <div className="form-rect">
                  <form className="contact-form" id="contact-form">
                    <input
                      className="contact-inputs"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full Name"
                    />
                    <input
                      className="contact-inputs"
                      type="text"
                      id="email"
                      name="Email"
                      placeholder="Email"
                    />
                    <input
                      className="contact-inputs"
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Phone Number"
                    />
                    <textarea
                      style={{ height: "120px" }}
                      className="message-input"
                      id="message"
                      name="message"
                      placeholder="*Optional Message"
                    ></textarea>
                  </form>
                </div>
              </div>
              <div className="buttons">
                <button className="back" onClick={prevPage}>
                  <div className="text-wrapper-8">Back</div>
                </button>
                <button className="submit-button" id="submit-button">
                  <div className="text-wrapper-8" onClick={nextPage}>
                    Submit
                  </div>
                </button>
              </div>
            </div>
          )}

          {currentPage === 5 && (
            <div id="post-submit">
              <div className="page-section-title">Thank You!</div>
              <img
                src="../res/checkmark.jpg"
                alt="checkmark"
                className="checkmark-img"
              />
              <div className="post-section-descr">
                Your Request Has Been Submitted
              </div>
            </div>
          )}
        </div>
      </div>
      <script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&loading=async&libraries=places,drawing,geometry&callback=initAutocomplete`}
      ></script>
    </>
  );
}
