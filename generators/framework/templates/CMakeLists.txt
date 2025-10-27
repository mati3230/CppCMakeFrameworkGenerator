cmake_minimum_required(VERSION 3.10 FATAL_ERROR)

option(BUILD_WITH_TESTS "If ON, unit tests will be build." ON) 

if(POLICY CMP0074)
  cmake_policy(SET CMP0074 NEW)
endif()

set(PROJECT_NAME "<%= projectName %>")
set(PROJECT_VERSION "<%= projectVersion %>")
set(CMAKE_INSTALL_PREFIX "${CMAKE_BINARY_DIR}/install")

project(${PROJECT_NAME} LANGUAGES CXX VERSION ${PROJECT_VERSION})

include(cmake/AddSharedLibrary.cmake) # include helper function

if(MSVC)
    # export .dll + .lib files
    set(CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS ON)
endif()

set(PROJECT_INCLUDE_DIR "${PROJECT_SOURCE_DIR}/include/${PROJECT_NAME}")
set(PROJECT_TARGET_INCLUDE_DIR "${PROJECT_SOURCE_DIR}/include")
set(PROJECT_SRC_DIR "${PROJECT_SOURCE_DIR}/src/${PROJECT_NAME}")
# the library headers will be set within 'add_shared_library'
set(ALL_HEADERS "")
set(ALL_TARGETS "")

# have a look at 'cmake/AddSharedLibrary.cmake' to extend/change this method
add_shared_library(
    mfutils # the identifier of the library 
    "${PROJECT_SRC_DIR}/utils.cpp" # sources; multiple files should be seperated by a semicolon
    "${PROJECT_INCLUDE_DIR}/utils.h" # headers; multiple files should be seperated by a semicolon
    "${PROJECT_TARGET_INCLUDE_DIR}" # target include directories
    "" # target link libraries
)

install(TARGETS
    ${ALL_TARGETS}
    EXPORT ${PROJECT_NAME}Targets
    FILE_SET HEADERS
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
    RUNTIME DESTINATION bin)

install(EXPORT ${PROJECT_NAME}Targets
    FILE "${PROJECT_NAME}Targets.cmake"
    NAMESPACE "${PROJECT_NAME}::"
    DESTINATION cmake)

include(CMakePackageConfigHelpers)
write_basic_package_version_file(
    "${PROJECT_NAME}ConfigVersion.cmake"
    VERSION "${PROJECT_VERSION}"
    COMPATIBILITY AnyNewerVersion)

install(FILES "${PROJECT_NAME}Config.cmake" "${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}ConfigVersion.cmake"
    DESTINATION "cmake")

install(FILES
    ${ALL_HEADERS}
    DESTINATION "include/${PROJECT_NAME}")

if(BUILD_WITH_TESTS)
find_package(GTest REQUIRED)

enable_testing()

add_executable(run_tests
    tests/test_utils.cpp
)

target_include_directories(run_tests
    PRIVATE
    "${PROJECT_SOURCE_DIR}/include"
)

target_link_libraries(run_tests
    PRIVATE
    GTest::gtest_main
    ${ALL_TARGETS}
)

include(GoogleTest)
gtest_discover_tests(run_tests)
endif()