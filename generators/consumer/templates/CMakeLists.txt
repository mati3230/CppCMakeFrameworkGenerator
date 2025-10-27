cmake_minimum_required(VERSION 3.10 FATAL_ERROR)

if(POLICY CMP0074)
  cmake_policy(SET CMP0074 NEW)
endif()

set(PROJECT_NAME "<%= projectName %>")
set(PROJECT_VERSION "<%= projectVersion %>")

message(STATUS "ENV{MYFRAMEWORK_ROOT}: '$ENV{MYFRAMEWORK_ROOT}'")

project(${PROJECT_NAME} LANGUAGES CXX VERSION ${PROJECT_VERSION})

find_package(<%= frameworkName %> REQUIRED)

add_executable(${PROJECT_NAME} "main.cpp")

target_include_directories(${PROJECT_NAME} PRIVATE
    "$ENV{MYFRAMEWORK_ROOT}/include"
)

target_link_libraries(${PROJECT_NAME} PRIVATE
    <%= frameworkName %>::mfutils
)

if(WIN32)
get_target_property(lib<%= frameworkName %>_sharedlib <%= frameworkName %>::mfutils IMPORTED_LOCATION_DEBUG)
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD 
    COMMAND "${CMAKE_COMMAND}" -E copy 
    ${lib<%= frameworkName %>_sharedlib}
    ${CMAKE_CURRENT_BINARY_DIR} )
endif()