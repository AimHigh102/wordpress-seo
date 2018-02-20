(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/* global ajaxurl */
/* global tb_click */
jQuery(function () {
	jQuery(".subsubsub .yoast_help").on("click active", function () {
		var targetElementID = "#" + jQuery(this).attr("aria-controls");
		jQuery(".yoast-help-panel").not(targetElementID).hide();
	});

	// Store the control that opened the modal dialog for later use.
	var $gscModalFocusedBefore;

	jQuery("#gsc_auth_code").click(function () {
		var authUrl = jQuery("#gsc_auth_url").val(),
		    w = 600,
		    h = 500,
		    left = screen.width / 2 - w / 2,
		    top = screen.height / 2 - h / 2;
		return window.open(authUrl, "wpseogscauthcode", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, " + "copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
	});

	// Accessibility improvements for the Create Redirect modal dialog.
	jQuery(".wpseo-open-gsc-redirect-modal").click(function (event) {
		var $modal;
		var $modalTitle;
		var $closeButtonTop;
		var $closeButtonBottom;

		// Get the link text to be used as the modal title.
		var title = jQuery(this).text();

		// Prevent default action.
		event.preventDefault();
		// Prevent triggering Thickbox original click.
		event.stopPropagation();
		// Get the control that opened the modal dialog.
		$gscModalFocusedBefore = jQuery(this);
		// Call Thickbox now and bind `this`. The Thickbox UI is now available.
		// eslint-disable-next-line
		tb_click.call(this);

		// Get the Thickbox modal elements.
		$modal = jQuery("#TB_window");
		$modalTitle = jQuery("#TB_ajaxWindowTitle");
		$closeButtonTop = jQuery("#TB_closeWindowButton");
		$closeButtonBottom = jQuery(".wpseo-redirect-close", $modal);

		// Set the modal title.
		$modalTitle.text(title);

		// Set ARIA role and ARIA attributes.
		$modal.attr({
			role: "dialog",
			"aria-labelledby": "TB_ajaxWindowTitle",
			"aria-describedby": "TB_ajaxContent"
		}).on("keydown", function (event) {
			var id;

			// Constrain tabbing within the modal.
			if (9 === event.which) {
				id = event.target.id;

				if (jQuery(event.target).hasClass("wpseo-redirect-close") && !event.shiftKey) {
					$closeButtonTop.focus();
					event.preventDefault();
				} else if (id === "TB_closeWindowButton" && event.shiftKey) {
					$closeButtonBottom.focus();
					event.preventDefault();
				}
			}
		});
	});

	jQuery(document.body).on("click", ".wpseo-redirect-close", function () {
		// Close the Thickbox modal when clicking on the bottom button.
		jQuery(this).closest("#TB_window").find("#TB_closeWindowButton").trigger("click");
	}).on("thickbox:removed", function () {
		// Move focus back to the element that opened the modal.
		$gscModalFocusedBefore.focus();
	});
});

/**
 * Decrement current category count by one.
 *
 * @param {string} category The category count to update.
 *
 * @returns {void}
 */
function wpseoUpdateCategoryCount(category) {
	var countElement = jQuery("#gsc_count_" + category + "");
	var newCount = parseInt(countElement.text(), 10) - 1;
	if (newCount < 0) {
		newCount = 0;
	}

	countElement.text(newCount);
}

/**
 * Sends the request to mark the given url as fixed.
 *
 * @param {string} nonce    The nonce for the request
 * @param {string} platform The platform to mark the issue for.
 * @param {string} category The category to mark the issue for.
 * @param {string} url      The url to mark as fixed.
 *
 * @returns {void}
 */
function wpseoSendMarkAsFixed(nonce, platform, category, url) {
	jQuery.post(ajaxurl, {
		action: "wpseo_mark_fixed_crawl_issue",
		// eslint-disable-next-line
		ajax_nonce: nonce,
		platform: platform,
		category: category,
		url: url
	}, function (response) {
		if ("true" === response) {
			wpseoUpdateCategoryCount(jQuery("#field_category").val());
			jQuery('span:contains("' + url + '")').closest("tr").remove();
		}
	});
}

/**
 * Marks a search console crawl issue as fixed.
 *
 * @param {string} url The URL that has been fixed.
 *
 * @returns {void}
 */
function wpseoMarkAsFixed(url) {
	wpseoSendMarkAsFixed(jQuery(".wpseo-gsc-ajax-security").val(), jQuery("#field_platform").val(), jQuery("#field_category").val(), url);
}

window.wpseoUpdateCategoryCount = wpseoUpdateCategoryCount;
window.wpseoMarkAsFixed = wpseoMarkAsFixed;
window.wpseoSendMarkAsFixed = wpseoSendMarkAsFixed;

/* eslint-disable camelcase */
window.wpseo_update_category_count = wpseoUpdateCategoryCount;
window.wpseo_mark_as_fixed = wpseoMarkAsFixed;
window.wpseo_send_mark_as_fixed = wpseoSendMarkAsFixed;
/* eslint-enable camelcase */

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvd3Atc2VvLWFkbWluLWdzYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQTtBQUNBLE9BQVEsWUFBVztBQUNsQixRQUFRLHdCQUFSLEVBQW1DLEVBQW5DLENBQ0MsY0FERCxFQUVDLFlBQVc7QUFDVixNQUFJLGtCQUFrQixNQUFNLE9BQVEsSUFBUixFQUFlLElBQWYsQ0FBcUIsZUFBckIsQ0FBNUI7QUFDQSxTQUFRLG1CQUFSLEVBQThCLEdBQTlCLENBQW1DLGVBQW5DLEVBQXFELElBQXJEO0FBQ0EsRUFMRjs7QUFTQTtBQUNBLEtBQUksc0JBQUo7O0FBRUEsUUFBUSxnQkFBUixFQUEyQixLQUEzQixDQUNDLFlBQVc7QUFDVixNQUFJLFVBQVUsT0FBUSxlQUFSLEVBQTBCLEdBQTFCLEVBQWQ7QUFBQSxNQUNDLElBQUksR0FETDtBQUFBLE1BRUMsSUFBSSxHQUZMO0FBQUEsTUFHQyxPQUFTLE9BQU8sS0FBUCxHQUFlLENBQWpCLEdBQXlCLElBQUksQ0FIckM7QUFBQSxNQUlDLE1BQVEsT0FBTyxNQUFQLEdBQWdCLENBQWxCLEdBQTBCLElBQUksQ0FKckM7QUFLQSxTQUFPLE9BQU8sSUFBUCxDQUNOLE9BRE0sRUFFTixrQkFGTSxFQUdOLG1HQUNBLHdCQURBLEdBQzJCLENBRDNCLEdBQytCLFdBRC9CLEdBQzZDLENBRDdDLEdBQ2lELFFBRGpELEdBQzRELEdBRDVELEdBQ2tFLFNBRGxFLEdBQzhFLElBSnhFLENBQVA7QUFNQSxFQWJGOztBQWdCQTtBQUNBLFFBQVEsZ0NBQVIsRUFBMkMsS0FBM0MsQ0FDQyxVQUFVLEtBQVYsRUFBa0I7QUFDakIsTUFBSSxNQUFKO0FBQ0EsTUFBSSxXQUFKO0FBQ0EsTUFBSSxlQUFKO0FBQ0EsTUFBSSxrQkFBSjs7QUFFQTtBQUNBLE1BQUksUUFBUSxPQUFRLElBQVIsRUFBZSxJQUFmLEVBQVo7O0FBRUE7QUFD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MUI7QUFDQSxPQUFPLG9CQUFQLEdBQThCLG9CQUE5Qjs7QUFFQTtBQUNBLE9BQU8sMkJBQVAsR0FBcUMsd0JBQXJDO0FBQ0EsT0FBTyxtQkFBUCxHQUE2QixnQkFBN0I7QUFDQSxPQUFPLHdCQUFQLEdBQWtDLG9CQUFsQztBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBhamF4dXJsICovXG4vKiBnbG9iYWwgdGJfY2xpY2sgKi9cbmpRdWVyeSggZnVuY3Rpb24oKSB7XG5cdGpRdWVyeSggXCIuc3Vic3Vic3ViIC55b2FzdF9oZWxwXCIgKS5vbihcblx0XHRcImNsaWNrIGFjdGl2ZVwiLFxuXHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0bGV0IHRhcmdldEVsZW1lbnRJRCA9IFwiI1wiICsgalF1ZXJ5KCB0aGlzICkuYXR0ciggXCJhcmlhLWNvbnRyb2xzXCIgKTtcblx0XHRcdGpRdWVyeSggXCIueW9hc3QtaGVscC1wYW5lbFwiICkubm90KCB0YXJnZXRFbGVtZW50SUQgKS5oaWRlKCk7XG5cdFx0fVxuXHQpO1xuXG5cblx0Ly8gU3RvcmUgdGhlIGNvbnRyb2wgdGhhdCBvcGVuZWQgdGhlIG1vZGFsIGRpYWxvZyBmb3IgbGF0ZXIgdXNlLlxuXHR2YXIgJGdzY01vZGFsRm9jdXNlZEJlZm9yZTtcblxuXHRqUXVlcnkoIFwiI2dzY19hdXRoX2NvZGVcIiApLmNsaWNrKFxuXHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGF1dGhVcmwgPSBqUXVlcnkoIFwiI2dzY19hdXRoX3VybFwiICkudmFsKCksXG5cdFx0XHRcdHcgPSA2MDAsXG5cdFx0XHRcdGggPSA1MDAsXG5cdFx0XHRcdGxlZnQgPSAoIHNjcmVlbi53aWR0aCAvIDIgKSAtICggdyAvIDIgKSxcblx0XHRcdFx0dG9wID0gKCBzY3JlZW4uaGVpZ2h0IC8gMiApIC0gKCBoIC8gMiApO1xuXHRcdFx0cmV0dXJuIHdpbmRvdy5vcGVuKFxuXHRcdFx0XHRhdXRoVXJsLFxuXHRcdFx0XHRcIndwc2VvZ3NjYXV0aGNvZGVcIixcblx0XHRcdFx0XCJ0b29sYmFyPW5vLCBsb2NhdGlvbj1ubywgZGlyZWN0b3JpZXM9bm8sIHN0YXR1cz1ubywgbWVudWJhcj1ubywgc2Nyb2xsYmFycz15ZXMsIHJlc2l6YWJsZT1ubywgXCIgK1xuXHRcdFx0XHRcImNvcHloaXN0b3J5PW5vLCB3aWR0aD1cIiArIHcgKyBcIiwgaGVpZ2h0PVwiICsgaCArIFwiLCB0b3A9XCIgKyB0b3AgKyBcIiwgbGVmdD1cIiArIGxlZnRcblx0XHRcdCk7XG5cdFx0fVxuXHQpO1xuXG5cdC8vIEFjY2Vzc2liaWxpdHkgaW1wcm92ZW1lbnRzIGZvciB0aGUgQ3JlYXRlIFJlZGlyZWN0IG1vZGFsIGRpYWxvZy5cblx0alF1ZXJ5KCBcIi53cHNlby1vcGVuLWdzYy1yZWRpcmVjdC1tb2RhbFwiICkuY2xpY2soXG5cdFx0ZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0dmFyICRtb2RhbDtcblx0XHRcdHZhciAkbW9kYWxUaXRsZTtcblx0XHRcdHZhciAkY2xvc2VCdXR0b25Ub3A7XG5cdFx0XHR2YXIgJGNsb3NlQnV0dG9uQm90dG9tO1xuXG5cdFx0XHQvLyBHZXQgdGhlIGxpbmsgdGV4dCB0byBiZSB1c2VkIGFzIHRoZSBtb2RhbCB0aXRsZS5cblx0XHRcdHZhciB0aXRsZSA9IGpRdWVyeSggdGhpcyApLnRleHQoKTtcblxuXHRcdFx0Ly8gUHJldmVudCBkZWZhdWx0IGFjdGlvbi5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQvLyBQcmV2ZW50IHRyaWdnZXJpbmcgVGhpY2tib3ggb3JpZ2luYWwgY2xpY2suXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdC8vIEdldCB0aGUgY29udHJvbCB0aGF0IG9wZW5lZCB0aGUgbW9kYWwgZGlhbG9nLlxuXHRcdFx0JGdzY01vZGFsRm9jdXNlZEJlZm9yZSA9IGpRdWVyeSggdGhpcyApO1xuXHRcdFx0Ly8gQ2FsbCBUaGlja2JveCBub3cgYW5kIGJpbmQgYHRoaXNgLiBUaGUgVGhpY2tib3ggVUkgaXMgbm93IGF2YWlsYWJsZS5cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXHRcdFx0dGJfY2xpY2suY2FsbCggdGhpcyApO1xuXG5cdFx0XHQvLyBHZXQgdGhlIFRoaWNrYm94IG1vZGFsIGVsZW1lbnRzLlxuXHRcdFx0JG1vZGFsID0galF1ZXJ5KCBcIiNUQl93aW5kb3dcIiApO1xuXHRcdFx0JG1vZGFsVGl0bGUgPSBqUXVlcnkoIFwiI1RCX2FqYXhXaW5kb3dUaXRsZVwiICk7XG5cdFx0XHQkY2xvc2VCdXR0b25Ub3AgPSBqUXVlcnkoIFwiI1RCX2Nsb3NlV2luZG93QnV0dG9uXCIgKTtcblx0XHRcdCRjbG9zZUJ1dHRvbkJvdHRvbSA9IGpRdWVyeSggXCIud3BzZW8tcmVkaXJlY3QtY2xvc2VcIiwgJG1vZGFsICk7XG5cblx0XHRcdC8vIFNldCB0aGUgbW9kYWwgdGl0bGUuXG5cdFx0XHQkbW9kYWxUaXRsZS50ZXh0KCB0aXRsZSApO1xuXG5cdFx0XHQvLyBTZXQgQVJJQSByb2xlIGFuZCBBUklBIGF0dHJpYnV0ZXMuXG5cdFx0XHQkbW9kYWwuYXR0cigge1xuXHRcdFx0XHRyb2xlOiBcImRpYWxvZ1wiLFxuXHRcdFx0XHRcImFyaWEtbGFiZWxsZWRieVwiOiBcIlRCX2FqYXhXaW5kb3dUaXRsZVwiLFxuXHRcdFx0XHRcImFyaWEtZGVzY3JpYmVkYnlcIjogXCJUQl9hamF4Q29udGVudFwiLFxuXHRcdFx0fSApXG5cdFx0XHQub24oIFwia2V5ZG93blwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdHZhciBpZDtcblxuXHRcdFx0XHQvLyBDb25zdHJhaW4gdGFiYmluZyB3aXRoaW4gdGhlIG1vZGFsLlxuXHRcdFx0XHRpZiAoIDkgPT09IGV2ZW50LndoaWNoICkge1xuXHRcdFx0XHRcdGlkID0gZXZlbnQudGFyZ2V0LmlkO1xuXG5cdFx0XHRcdFx0aWYgKCBqUXVlcnkoIGV2ZW50LnRhcmdldCApLmhhc0NsYXNzKCBcIndwc2VvLXJlZGlyZWN0LWNsb3NlXCIgKSAmJiAhIGV2ZW50LnNoaWZ0S2V5ICkge1xuXHRcdFx0XHRcdFx0JGNsb3NlQnV0dG9uVG9wLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIGlkID09PSBcIlRCX2Nsb3NlV2luZG93QnV0dG9uXCIgJiYgZXZlbnQuc2hpZnRLZXkgKSB7XG5cdFx0XHRcdFx0XHQkY2xvc2VCdXR0b25Cb3R0b20uZm9jdXMoKTtcblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0fVxuXHQpO1xuXG5cdGpRdWVyeSggZG9jdW1lbnQuYm9keSApLm9uKCBcImNsaWNrXCIsIFwiLndwc2VvLXJlZGlyZWN0LWNsb3NlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdC8vIENsb3NlIHRoZSBUaGlja2JveCBtb2RhbCB3aGVuIGNsaWNraW5nIG9uIHRoZSBib3R0b20gYnV0dG9uLlxuXHRcdGpRdWVyeSggdGhpcyApLmNsb3Nlc3QoIFwiI1RCX3dpbmRvd1wiICkuZmluZCggXCIjVEJfY2xvc2VXaW5kb3dCdXR0b25cIiApLnRyaWdnZXIoIFwiY2xpY2tcIiApO1xuXHR9ICkub24oIFwidGhpY2tib3g6cmVtb3ZlZFwiLCBmdW5jdGlvbigpIHtcblx0XHQvLyBNb3ZlIGZvY3VzIGJhY2sgdG8gdGhlIGVsZW1lbnQgdGhhdCBvcGVuZWQgdGhlIG1vZGFsLlxuXHRcdCRnc2NNb2RhbEZvY3VzZWRCZWZvcmUuZm9jdXMoKTtcblx0fSApO1xufSApO1xuXG5cbi8qKlxuICogRGVjcmVtZW50IGN1cnJlbnQgY2F0ZWdvcnkgY291bnQgYnkgb25lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjYXRlZ29yeSBUaGUgY2F0ZWdvcnkgY291bnQgdG8gdXBkYXRlLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB3cHNlb1VwZGF0ZUNhdGVnb3J5Q291bnQoIGNhdGVnb3J5ICkge1xuXHR2YXIgY291bnRFbGVtZW50ID0galF1ZXJ5KCBcIiNnc2NfY291bnRfXCIgKyBjYXRlZ29yeSArIFwiXCIgKTtcblx0dmFyIG5ld0NvdW50ICAgICA9IHBhcnNlSW50KCBjb3VudEVsZW1lbnQudGV4dCgpLCAxMCApIC0gMTtcblx0aWYoIG5ld0NvdW50IDwgMCApIHtcblx0XHRuZXdDb3VudCA9IDA7XG5cdH1cblxuXHRjb3VudEVsZW1lbnQudGV4dCggbmV3Q291bnQgKTtcbn1cblxuLyoqXG4gKiBTZW5kcyB0aGUgcmVxdWVzdCB0byBtYXJrIHRoZSBnaXZlbiB1cmwgYXMgZml4ZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5vbmNlICAgIFRoZSBub25jZSBmb3IgdGhlIHJlcXVlc3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gdG8gbWFyayB0aGUgaXNzdWUgZm9yLlxuICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5IFRoZSBjYXRlZ29yeSB0byBtYXJrIHRoZSBpc3N1ZSBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsICAgICAgVGhlIHVybCB0byBtYXJrIGFzIGZpeGVkLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB3cHNlb1NlbmRNYXJrQXNGaXhlZCggbm9uY2UsIHBsYXRmb3JtLCBjYXRlZ29yeSwgdXJsICkge1xuXHRqUXVlcnkucG9zdChcblx0XHRhamF4dXJsLFxuXHRcdHtcblx0XHRcdGFjdGlvbjogXCJ3cHNlb19tYXJrX2ZpeGVkX2NyYXdsX2lzc3VlXCIsXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcblx0XHRcdGFqYXhfbm9uY2U6IG5vbmNlLFxuXHRcdFx0cGxhdGZvcm06IHBsYXRmb3JtLFxuXHRcdFx0Y2F0ZWdvcnk6IGNhdGVnb3J5LFxuXHRcdFx0dXJsOiB1cmwsXG5cdFx0fSxcblx0XHRmdW5jdGlvbiggcmVzcG9uc2UgKSB7XG5cdFx0XHRpZiAoIFwidHJ1ZVwiID09PSByZXNwb25zZSApIHtcblx0XHRcdFx0d3BzZW9VcGRhdGVDYXRlZ29yeUNvdW50KCBqUXVlcnkoIFwiI2ZpZWxkX2NhdGVnb3J5XCIgKS52YWwoKSApO1xuXHRcdFx0XHRqUXVlcnkoICdzcGFuOmNvbnRhaW5zKFwiJyArIHVybCArICdcIiknICkuY2xvc2VzdCggXCJ0clwiICkucmVtb3ZlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xufVxuXG4vKipcbiAqIE1hcmtzIGEgc2VhcmNoIGNvbnNvbGUgY3Jhd2wgaXNzdWUgYXMgZml4ZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRoYXQgaGFzIGJlZW4gZml4ZWQuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHdwc2VvTWFya0FzRml4ZWQoIHVybCApIHtcblx0d3BzZW9TZW5kTWFya0FzRml4ZWQoXG5cdFx0alF1ZXJ5KCBcIi53cHNlby1nc2MtYWpheC1zZWN1cml0eVwiICkudmFsKCksXG5cdFx0alF1ZXJ5KCBcIiNmaWVsZF9wbGF0Zm9ybVwiICkudmFsKCksXG5cdFx0alF1ZXJ5KCBcIiNmaWVsZF9jYXRlZ29yeVwiICkudmFsKCksXG5cdFx0dXJsXG5cdCk7XG59XG5cbndpbmRvdy53cHNlb1VwZGF0ZUNhdGVnb3J5Q291bnQgPSB3cHNlb1VwZGF0ZUNhdGVnb3J5Q291bnQ7XG53aW5kb3cud3BzZW9NYXJrQXNGaXhlZCA9IHdwc2VvTWFya0FzRml4ZWQ7XG53aW5kb3cud3BzZW9TZW5kTWFya0FzRml4ZWQgPSB3cHNlb1NlbmRNYXJrQXNGaXhlZDtcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG53aW5kb3cud3BzZW9fdXBkYXRlX2NhdGVnb3J5X2NvdW50ID0gd3BzZW9VcGRhdGVDYXRlZ29yeUNvdW50O1xud2luZG93Lndwc2VvX21hcmtfYXNfZml4ZWQgPSB3cHNlb01hcmtBc0ZpeGVkO1xud2luZG93Lndwc2VvX3NlbmRfbWFya19hc19maXhlZCA9IHdwc2VvU2VuZE1hcmtBc0ZpeGVkO1xuLyogZXNsaW50LWVuYWJsZSBjYW1lbGNhc2UgKi9cbiJdfQ==