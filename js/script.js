/*
        Name: Preston Wilson
        Email: preston_wilson@student.uml.edu
        Assignment: HW4 - Part 1
*/

$(function () {
    "use strict";

    var MIN_VALUE = -50;
    var MAX_VALUE = 50;
/*
        The plugin has number checking built in, but this custom method keeps
        the assignment limited to whole-number table values.
*/
    $.validator.addMethod("wholeNumber", function (value, element) {
        return this.optional(element) || /^-?\d+$/.test(value);
    }, "Please enter a whole number.");

    $.validator.addMethod("rowOrder", function (value, element) {
        var rowStart = parseInt($("#rowStart").val(), 10);
        var rowEnd = parseInt(value, 10);

        if (Number.isNaN(rowStart) || Number.isNaN(rowEnd)) {
            return true;
        }

        return rowStart <= rowEnd;
    }, "The maximum row value must be greater than or equal to the minimum row value.");

    $.validator.addMethod("colOrder", function (value, element) {
        var colStart = parseInt($("#colStart").val(), 10);
        var colEnd = parseInt(value, 10);

        if (Number.isNaN(colStart) || Number.isNaN(colEnd)) {
            return true;
        }

        return colStart <= colEnd;
    }, "The maximum column value must be greater than or equal to the minimum column value.");

    $("#tableForm").validate({
        rules: {
            rowStart: {
                required: true,
                wholeNumber: true,
                min: MIN_VALUE,
                max: MAX_VALUE
            },
            rowEnd: {
                required: true,
                wholeNumber: true,
                min: MIN_VALUE,
                max: MAX_VALUE,
                rowOrder: true
            },
            colStart: {
                required: true,
                wholeNumber: true,
                min: MIN_VALUE,
                max: MAX_VALUE
            },
            colEnd: {
                required: true,
                wholeNumber: true,
                min: MIN_VALUE,
                max: MAX_VALUE,
                colOrder: true
            }
        },
        messages: {
            rowStart: {
                required: "Please enter the smallest row number.",
                min: "The smallest row number cannot be less than -50.",
                max: "The smallest row number cannot be greater than 50."
            },
            rowEnd: {
                required: "Please enter the largest row number.",
                min: "The largest row number cannot be less than -50.",
                max: "The largest row number cannot be greater than 50."
            },
            colStart: {
                required: "Please enter the smallest column number.",
                min: "The smallest column number cannot be less than -50.",
                max: "The smallest column number cannot be greater than 50."
            },
            colEnd: {
                required: "Please enter the largest column number.",
                min: "The largest column number cannot be less than -50.",
                max: "The largest column number cannot be greater than 50."
            }
        },
        errorPlacement: function (error, element) {
/*
                Custom placement keeps each message beside the exact input that
                needs to be fixed instead of placing all messages at the bottom.
*/
            $("#" + element.attr("id") + "Error").empty().append(error);
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            buildTable();
            return false;
        }
    });

    function getNumbers() {
        return {
            rowStart: parseInt($("#rowStart").val(), 10),
            rowEnd: parseInt($("#rowEnd").val(), 10),
            colStart: parseInt($("#colStart").val(), 10),
            colEnd: parseInt($("#colEnd").val(), 10)
        };
    }

    function buildTable() {
        var values = getNumbers();
        var tableHtml = createTableHtml(values);

        $("#statusMessage").text(
            "Showing rows " + values.rowStart + " through " + values.rowEnd +
            " and columns " + values.colStart + " through " + values.colEnd + "."
        );

        $("#tableOutput").html(tableHtml);
    }

    function createTableHtml(values) {
        var html = "<table><thead><tr><th>&times;</th>";
        var row;
        var col;

        for (col = values.colStart; col <= values.colEnd; col += 1) {
            html += "<th>" + col + "</th>";
        }

        html += "</tr></thead><tbody>";

        for (row = values.rowStart; row <= values.rowEnd; row += 1) {
            html += "<tr><th>" + row + "</th>";

            for (col = values.colStart; col <= values.colEnd; col += 1) {
                html += "<td>" + (row * col) + "</td>";
            }

            html += "</tr>";
        }

        html += "</tbody></table>";
        return html;
    }
});
