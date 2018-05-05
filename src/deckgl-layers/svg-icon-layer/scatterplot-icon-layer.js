// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {ScatterplotLayer} from 'deck.gl';
import {GL, Geometry, Model} from 'luma.gl';

export default class ScatterplotIconLayer extends ScatterplotLayer {
  _getModel(gl) {
    // use default scatterplot shaders
    const shaders = this.getShaders();
    const defaultPos = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0];
    const {iconGeometry} = this.props;

    const geometry = iconGeometry
      ? new Geometry({
          drawMode: GL.TRIANGLES,
          positions: new Float32Array(iconGeometry)
        })
      : new Geometry({
          drawMode: GL.TRIANGLE_FAN,
          positions: new Float32Array(defaultPos)
        });

    return new Model(gl, {
      ...shaders,
      id: this.props.id,
      geometry,
      isInstanced: true,
      shaderCache: this.context.shaderCache
    });
  }
}

ScatterplotIconLayer.layerName = 'ScatterplotIconLayer';