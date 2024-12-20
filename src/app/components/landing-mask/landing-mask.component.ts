import { Component, ElementRef, Renderer2, AfterViewInit, ViewChildren, QueryList, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component to display animated circles on the landing page mask.
 */
@Component({
  selector: 'app-landing-mask',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-mask.component.html',
  styleUrls: ['./landing-mask.component.scss']
})
export class LandingMaskComponent implements AfterViewInit {

  /**
   * Array of circle configurations with their starting positions.
   */
  circles: Array<{ class: string, startX: number, startY: number }> = [];

  /**
   * ViewChildren query to capture all circle elements generated by *ngFor.
   */
  @ViewChildren('circleElement') circleElements!: QueryList<ElementRef>;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.generateRandomCircles();
  }

  /**
   * Generates a random number of circles (from 3 to 9) and assigns random positions.
   */
  generateRandomCircles(): void {
    const minCircles = 3;
    const maxCircles = 9;
    const circleCount = Math.floor(Math.random() * (maxCircles - minCircles + 1)) + minCircles;
    const possiblePositions = [
      { class: 'top-left-circle', startX: -100, startY: -100 },
      { class: 'center-left-circle', startX: -50, startY: -50 },
      { class: 'bottom-center-circle', startX: 50, startY: 100 },
      { class: 'center-right-circle', startX: 100, startY: -50 },
      { class: 'top-right-circle', startX: 80, startY: -60 },
      { class: 'center-center-circle', startX: 0, startY: 0 },
      { class: 'bottom-left-circle', startX: -50, startY: 60 }
    ];

    // Randomly select circle positions
    this.circles = [];
    for (let i = 0; i < circleCount; i++) {
      const randomPosition = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
      this.circles.push(randomPosition);
    }
  }

  /**
   * Starts the animation for each circle after view initialization.
   */
  ngAfterViewInit(): void {
    this.circleElements.toArray().forEach((circleElementRef, index) => {
      const circle = this.circles[index];
      this.animateCircle(circle, circleElementRef.nativeElement);
    });
  }

  /**
   * Animates each circle element.
   * @param circle The circle configuration (class name and start position).
   * @param circleElement The reference to the circle DOM element.
   */
  animateCircle(circle: { class: string; startX: number; startY: number }, circleElement: HTMLElement): void {
    const randomSize = `${Math.floor(Math.random() * (600 - 400 + 1)) + 400}px`;
    const duration = Math.random() * 4 + 7; // Duration between 7 and 11 seconds

    this.renderer.setStyle(circleElement, 'width', randomSize);
    this.renderer.setStyle(circleElement, 'height', randomSize);

    const keyframes = [
      { transform: `translate(${circle.startX}%, ${circle.startY}%) scale(0.5)`, opacity: 0 },
      { transform: `translate(0, 0) scale(1)`, opacity: 0.4 }
    ];

    // Execute animation using Web Animations API
    circleElement.animate(keyframes, {
      duration: duration * 1000, // Convert to milliseconds
      easing: 'ease-in-out',
      fill: 'forwards'
    });
  }

  /**
   * Listen to window resize events and regenerate circles accordingly.
   */
  @HostListener('window:resize')
  onResize(): void {
    this.generateRandomCircles();
  }
}