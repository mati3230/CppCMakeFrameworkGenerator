#include <gtest/gtest.h>
#include <<%= projectName %>/utils.h> 

/**
 * @brief Units tests of the \ref utils.h implementation.
 */
TEST(MFUtilsTest, BasicFunctionality) {
    EXPECT_EQ(<%= projectName %>::Add(2, 3), 5);
}