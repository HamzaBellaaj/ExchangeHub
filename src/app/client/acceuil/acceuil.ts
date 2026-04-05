import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acceuil.html',
  styleUrl: './acceuil.css',
})
export class Acceuil implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('frameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private frames: HTMLImageElement[] = [];
  private currentFrameIndex = 0;
  private totalFrames = 94; // Nombre réel d'images disponibles
  private context: CanvasRenderingContext2D | null = null;
  private canvasWidth = 0;
  private canvasHeight = 0;
  private animationId: number | null = null;
  scrollProgress = 0;

  ngOnInit(): void {
    this.loadFrames();
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d');
    
    // Set initial canvas size
    this.resizeCanvas();
    
    // Listen to resize events
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Start scroll tracking
    this.startScrollTracking();
  }

  /**
   * Load all frame images asynchronously
   */
  private loadFrames(): void {
    const framePromises = [];
    
    // Load images: téléchargement (4).jpg to téléchargement (94).jpg
    for (let i = 4; i <= 94; i++) {
      framePromises.push(
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = `/frames/téléchargement (${i}).jpg`;
          
          img.onload = () => {
            this.frames.push(img);
            resolve(true);
          };
          
          img.onerror = () => {
            console.warn(`Failed to load image: téléchargement (${i}).jpg`);
            resolve(false);
          };
        })
      );
    }

    Promise.all(framePromises).then(() => {
      console.log(`Successfully loaded ${this.frames.length} frames`);
      this.totalFrames = this.frames.length;
      // Draw first frame
      this.drawFrame(0);
    });
  }

  /**
   * Adjust canvas to match viewport
   */
  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement as HTMLElement;
    
    const rect = container.getBoundingClientRect();
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    
    // Redraw current frame at new size
    this.drawFrame(this.currentFrameIndex);
  }

  /**
   * Track scroll position and update frame
   */
  private startScrollTracking(): void {
    const updateFrame = () => {
      // Use window scroll position relative to document height
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const scrolled = window.scrollY;
      
      // Calculate progress (0 to 1)
      const progress = scrollableHeight > 0 ? scrolled / scrollableHeight : 0;
      this.scrollProgress = Math.min(progress, 1);
      
      // Map to frame index
      const frameIndex = Math.floor(this.scrollProgress * (this.frames.length - 1));
      
      // Draw frame only if it changed
      if (frameIndex !== this.currentFrameIndex && frameIndex < this.frames.length) {
        this.currentFrameIndex = frameIndex;
        this.drawFrame(frameIndex);
      }
      
      this.animationId = requestAnimationFrame(updateFrame);
    };
    
    updateFrame();
  }

  /**
   * Draw frame to canvas with cover mode
   */
  private drawFrame(frameIndex: number): void {
    if (!this.context || frameIndex >= this.frames.length) {
      return;
    }

    const frame = this.frames[frameIndex];
    if (!frame) {
      return;
    }

    // Clear canvas with white background
    this.context.fillStyle = '#ffffff';
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Calculate scaling for cover mode (image fills entire canvas)
    const imgAspect = frame.naturalWidth / frame.naturalHeight;
    const canvasAspect = this.canvasWidth / this.canvasHeight;
    
    let drawWidth = this.canvasWidth;
    let drawHeight = this.canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > canvasAspect) {
      // Image is wider - scale by height
      drawWidth = this.canvasHeight * imgAspect;
      offsetX = (this.canvasWidth - drawWidth) / 2;
    } else {
      // Image is taller - scale by width
      drawHeight = this.canvasWidth / imgAspect;
      offsetY = (this.canvasHeight - drawHeight) / 2;
    }

    // Draw image to fill entire canvas
    this.context.drawImage(
      frame,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    );
  }

  ngOnDestroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', () => this.resizeCanvas());
  }
}
