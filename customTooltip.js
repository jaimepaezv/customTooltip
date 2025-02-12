/**
 * customTooltip.js - Script para crear tooltips personalizados y mejorados.
 *
 * Autor: [Tu Nombre o Alias]
 * Fecha: [Fecha de Creación]
 */

document.addEventListener('DOMContentLoaded', function() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        let tooltipNode = null; // Variable para almacenar el nodo del tooltip

        element.addEventListener('mouseover', function(event) {
            const tooltipText = element.getAttribute('data-tooltip');
            if (!tooltipText) return; // Si no hay texto, no hacer nada

            tooltipNode = createTooltip(tooltipText);
            document.body.appendChild(tooltipNode);

            positionTooltip(tooltipNode, element);

            // Pequeño retraso para la animación de aparición (opcional)
            setTimeout(() => {
                tooltipNode.classList.add('tooltip-visible');
            }, 10); // Un pequeño retraso para que la transición funcione
        });

        element.addEventListener('mouseout', function() {
            if (tooltipNode) {
                tooltipNode.classList.remove('tooltip-visible');
                // Esperar a la transición de opacidad para remover del DOM
                setTimeout(() => {
                    if (tooltipNode && tooltipNode.parentNode) { // Verificar si tooltipNode todavía existe y tiene padre
                        tooltipNode.parentNode.removeChild(tooltipNode);
                        tooltipNode = null; // Limpiar la referencia
                    }
                }, 150); // Debe coincidir con la duración de la transición en CSS
            }
        });
    });

    function createTooltip(text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        return tooltip;
    }

    function positionTooltip(tooltip, element) {
        const elementRect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;

        let top = elementRect.top + scrollY - tooltipRect.height - 10; // 10px de espacio por encima
        let left = elementRect.left + (elementRect.width / 2) - (tooltipRect.width / 2); // Centrado horizontalmente

        // Ajustar posición si se sale de la pantalla (horizontalmente)
        if (left < 10) {
            left = 10;
        } else if (left + tooltipRect.width + 10 > window.innerWidth) {
            left = window.innerWidth - tooltipRect.width - 10;
        }

        // Ajustar posición si se sale de la pantalla (verticalmente - intentar mostrar abajo si no cabe arriba)
        if (top < scrollY + 10) {
            top = elementRect.bottom + scrollY + 10; // Mostrar abajo si no cabe arriba
        }


        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
    }
});