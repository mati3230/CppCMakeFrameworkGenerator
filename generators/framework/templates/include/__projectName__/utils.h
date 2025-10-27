/**
 * @file utils.h
 * @author Marcel Tiator
 * @brief Collection of utility operations.
 * @version 0.0.1
 * @date 2025-10-26
 *
 * @copyright Copyright (c) 2025
 */

#pragma once

#include <string>

namespace <%= projectName %>
{
    /**
     * @brief Example operation that prints a message.
     */
    void MyUtilityOperation();
    /**
     * @brief Helper function to print a message.
     *
     * @param message The message to be printed.
     */
    void Print(const std::string& message);
    /**
     * @brief Sum of two numbers.
     *
     * @param a An input number.
     * @param b An input number.
     * @return int Sum of two numbers.
     */
    int Add(int a, int b);
}